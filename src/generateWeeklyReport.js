import { Temporal } from '@js-temporal/polyfill'

import { getDailyReports, summarizeReport } from './services/supabase/report.js'
import { getWorkspaces } from './services/supabase/workspace.js'
import { registerWeeklyPayment } from './services/supabase/payment.js'

import { getStartAndEndOfLastWeek } from './utils/getStartAndEndOfLastWeek.js'
import { sendWhatsAppMessage } from './services/whatsapp/client.js'

import { reportTemplateWeekly } from './email/reportTemplateWeekly.js'
import { sendEmail } from './email/sendEmail.js'

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
    }
  }

  if (!reports.length) return console.log('No hay ningún reporte semanal.')
  const htmlData = reportTemplateWeekly(reports)
  await sendEmail(
    htmlData,
    ['pamela@letymind.com'],
    'Seguimiento semanal de las horas registradas de los talentos'
  )

  const whatsappMessage =
    `📊 *Reporte Semanal*\n\n` +
    `📅 Periodo: ${startDate.split('T')[0]} - ${endDate.split('T')[0]}\n\n` +
    `*Detalles por Talento:*\n` +
    reports
      .map(
        report =>
          `• ${report.talent} (${report.company}): ${report.total_hours}hrs`
      )
      .join('\n')

  await sendWhatsAppMessage('991161399', whatsappMessage)

  console.group('Reporte Semanal:')
  console.table(reports)
  console.groupEnd()
}
