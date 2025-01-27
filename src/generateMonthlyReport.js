import { Temporal } from '@js-temporal/polyfill'

import { getDailyReports, summarizeReport } from './services/supabase/report.js'
import { getEligibleWorkspaces } from './services/supabase/workspace.js'
import {
  getPaymentPerHourWorkspace,
  registerMonthlyPayment,
} from './services/supabase/payment.js'

import { calculateTotalPayment } from './utils/calculateTotalPayment.js'

import { reportComercialTemplate } from './email/reportComercialTemplate.js'
import { reportTemplateMonthly } from './email/reportTemplateMonthly.js'
import { sendEmail } from './email/sendEmail.js'

const plaintDate = date => Temporal.PlainDate.from(date)
const compare = (a, b) => Temporal.PlainDate.compare(a, b)
const formatToISO = date => {
  const temporalDate = plaintDate(date)
  return temporalDate.toString() + 'T00:00:00Z'
}

export async function generateMonthlyReport() {
  const reports = []

  const workspaces = await getEligibleWorkspaces()
  const dailyReports = await getDailyReports()

  if (!workspaces.length) return console.log('No hay Workspaces elegibles.')

  for (const workspace of workspaces) {
    const {
      name,
      subscription_start_date,
      subscription_end_date,
      total_hours,
      level_id,
    } = workspace

    const subscriptionStartDate = plaintDate(subscription_start_date)
    const subscriptionEndDate = plaintDate(subscription_end_date)

    const filteredReports = dailyReports.filter(report => {
      const reportStartDate = plaintDate(report.start_date)
      const reportEndDate = plaintDate(report.end_date)

      return (
        total_hours > 0 &&
        compare(reportStartDate, subscriptionStartDate) >= 0 &&
        compare(reportEndDate, subscriptionEndDate) <= 0 &&
        report.company === name
      )
    })

    if (filteredReports.length) {
      const summarizedReport = await summarizeReport(filteredReports, {
        start_date: formatToISO(subscription_start_date),
        end_date: formatToISO(subscription_end_date),
      })

      const totalSummarizedHours = summarizedReport.reduce(
        (sum, report) => sum + (report.total_hours || 0),
        0
      )

      let remainingHours = 0
      let remainingPayment = 0

      if (totalSummarizedHours < total_hours) {
        const { cost_per_hour } = await getPaymentPerHourWorkspace(level_id)
        remainingHours = total_hours - totalSummarizedHours
        remainingPayment = calculateTotalPayment(remainingHours, cost_per_hour)
      }

      const reportsWithRemaining = summarizedReport.map(report => ({
        ...report,
        subscription_hours: total_hours,
        remaining_hours: remainingHours,
        letycash: remainingPayment,
      }))

      await registerMonthlyPayment(reportsWithRemaining)
      reports.push(...reportsWithRemaining)
    }
  }

  const htmlData = reportTemplateMonthly(reports)
  const htmlComercial = reportComercialTemplate(reports)
  await sendEmail(
    htmlData,
    ['pamela@letymind.com', 'andy@letymind.com', 'edhu@letymind.com'],
    'Reporte de subscripción de talento'
  )

  await sendEmail(
    htmlComercial,
    ['andy@letymind.com', 'comercial@letymind.com'],
    'Reporte de subscripción para comercial'
  )

  console.group('Reporte Mensual:')
  console.table(reports)
  console.groupEnd()
}
