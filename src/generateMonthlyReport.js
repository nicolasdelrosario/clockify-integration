import { Temporal } from '@js-temporal/polyfill'

import { getDailyReports, summarizeReport } from './services/supabase/report.js'
import { getEligibleWorkspaces } from './services/supabase/workspace.js'
import { registerMonthlyPayment } from './services/supabase/payment.js'

import { reportTemplate } from './email/reportTemplate.js'
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
    const { name, subscription_start_date, subscription_end_date } = workspace

    const subscriptionStartDate = plaintDate(subscription_start_date)
    const subscriptionEndDate = plaintDate(subscription_end_date)

    const filteredReports = dailyReports.filter(report => {
      const reportStartDate = plaintDate(report.start_date)
      const reportEndDate = plaintDate(report.end_date)

      return (
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

      await registerMonthlyPayment(summarizedReport)
      reports.push(...summarizedReport)
    }
  }

  const html = reportTemplate(
    'Reporte Mensual',
    'Detalle de los pagos a realizar:',
    reports
  )
  await sendEmail(html)

  console.group('Reporte Mensual:')
  console.table(reports)
  console.groupEnd()
}
