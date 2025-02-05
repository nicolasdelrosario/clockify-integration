import { Temporal } from '@js-temporal/polyfill'

import { getDailyReports, summarizeReport } from './services/supabase/report.js'
import { getEligibleWorkspaces } from './services/supabase/workspace.js'
import {
  getPaymentPerHourWorkspace,
  registerMonthlyPayment,
} from './services/supabase/payment.js'

import { calculateTotalPayment } from './utils/calculateTotalPayment.js'
import { sendWhatsAppMessage } from './services/whatsapp/client.js'

import { reportComercialTemplate } from './email/templates/reportComercialTemplate.js'
import { reportTemplateMonthly } from './email/templates/reportTemplateMonthly.js'
import { sendEmail } from './email/sendEmail.js'

import { monthlyTemplate } from './whatsapp/templates/monthlyTemplate.js'
import { userMonthlyTemplate as userMonthlyTemplateEmail } from './email/templates/userMonthlyTemplate.js'
import { userMonthlyTemplate } from './whatsapp/templates/userMonthlyTemplate.js'

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

  if (!workspaces.length) return console.log('🙌 No hay workspaces elegibles.')

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

      // Mensaje a cada talento
      for (const report of reportsWithRemaining) {
        const {
          email,
          phone,
          talent,
          total_hours,
          subscription_hours,
          remaining_hours,
          total_payment,
        } = report

        if (phone) {
          const userMessage = userMonthlyTemplate(
            talent,
            { total_hours, subscription_hours, remaining_hours, total_payment },
            {
              start_date: subscription_start_date,
              end_date: subscription_end_date,
            }
          )
          await sendWhatsAppMessage(phone, userMessage)
        }

        if (email) {
          const htmlData = userMonthlyTemplateEmail(
            talent,
            { total_hours, subscription_hours, remaining_hours, total_payment },
            {
              start_date: subscription_start_date,
              end_date: subscription_end_date,
            }
          )

          await sendEmail(
            htmlData,
            [email],
            `Reporte mensual de horas - ${subscription_start_date.split('T')[0]} - ${subscription_end_date.split('T')[0]}`
          )
        }
      }

      await registerMonthlyPayment(reportsWithRemaining)
      reports.push(...reportsWithRemaining)
    }
  }

  const htmlData = reportTemplateMonthly(reports)
  const htmlComercial = reportComercialTemplate(reports)
  await sendEmail(
    htmlData,
    ['delrosariolozanonicolas@gmail.com'],
    'Reporte de suscripción de talento'
  )

  await sendEmail(
    htmlComercial,
    ['delrosariolozanonicolas@gmail.com'],
    'Reporte de suscripción para comercial'
  )

  //pamela@letymind.com', 'andy@letymind.com', 'edhu@letymind.com
  //andy@letymind.com', 'comercial@letymind.com

  const whatsappMessage = monthlyTemplate(reports)
  await sendWhatsAppMessage('913621524', whatsappMessage)

  console.group('✅ Reporte mensual:')
  console.table(reports)
  console.groupEnd()
}
