import { Temporal } from '@js-temporal/polyfill'

import { getDailyReports, summarizeReport } from './services/supabase/report.js'
import { getWorkspaces } from './services/supabase/workspace.js'
import { registerWeeklyPayment } from './services/supabase/payment.js'

import { getStartAndEndOfLastWeek } from './utils/getStartAndEndOfLastWeek.js'

// Whatsapp
import { sendWhatsAppMessage } from './services/whatsapp/client.js'
import { userWeeklyTemplate } from './whatsapp/templates/userWeeklyTemplate.js'
import { weeklyTemplate } from './whatsapp/templates/weeklyTemplate.js'

// Email
import { reportTemplateWeekly } from './email/templates/reportTemplateWeekly.js'
import { sendEmail } from './email/sendEmail.js'
import { userWeeklyTemplate as userWeeklyTemplateEmail } from './email/templates/userWeeklyTemplate.js'

const plaintDate = date => Temporal.PlainDate.from(date.split('T')[0])
const compare = (a, b) => Temporal.PlainDate.compare(a, b)

export async function generateWeeklyReport() {
  const reports = []
  const workspaces = await getWorkspaces()
  const dailyReports = await getDailyReports()
  const { startDate, endDate } = getStartAndEndOfLastWeek()

  for (const workspace of workspaces) {
    const { name } = workspace

    const weekStartDate = plaintDate(startDate)
    const weekEndDate = plaintDate(endDate)

    const filteredReports = dailyReports.filter(report => {
      const reportStartDate = plaintDate(report.start_date)
      const reportEndDate = plaintDate(report.end_date)

      return (
        compare(reportStartDate, weekStartDate) >= 0 &&
        compare(reportEndDate, weekEndDate) <= 0 &&
        report.company === name
      )
    })

    if (filteredReports.length) {
      const summarizedReport = await summarizeReport(filteredReports, {
        start_date: startDate,
        end_date: endDate,
      })

      await registerWeeklyPayment(summarizedReport)
      reports.push(...summarizedReport)

      // Mensaje a cada talento
      for (const report of summarizedReport) {
        const { phone, talent, total_hours, email } = report
        // Send whatsApp message if phone exists
        if (phone) {
          const userMessage = userWeeklyTemplate(talent, total_hours, {
            startDate,
            endDate,
          })
          await sendWhatsAppMessage(phone, userMessage)
        }

        // Send email if email exists
        if (email) {
          const htmlData = userWeeklyTemplateEmail(talent, total_hours, {
            startDate,
            endDate,
          })
          await sendEmail(
            htmlData,
            [email],
            `Reporte semanal de horas - ${startDate.split('T')[0] + ' - ' + endDate.split('T')[0]}`
          )
        }
      }
    }
  }

  if (!reports.length) return console.log('🫣 No hay ningún reporte semanal.')

  const htmlData = reportTemplateWeekly(reports)
  await sendEmail(
    htmlData,
    ['delrosariolozanonicolas@gmail.com'],
    'Seguimiento semanal de las horas registradas de los talentos'
  )
  //pamela@letymind.com

  const whatsappMessage = weeklyTemplate(reports, { startDate, endDate })
  await sendWhatsAppMessage('913621524', whatsappMessage)

  console.group('✅ Reporte semanal:')
  console.table(reports)
  console.groupEnd()
}
