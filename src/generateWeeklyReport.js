import { Temporal } from '@js-temporal/polyfill'

import { getDailyReports, summarizeReport } from './services/supabase/report.js'
import { getWorkspaces } from './services/supabase/workspace.js'
import { registerWeeklyPayment } from './services/supabase/payment.js'

import { getStartAndEndOfLastWeek } from './utils/getStartAndEndOfLastWeek.js'

import { reportTemplate } from './email/reportTemplate.js'
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

  const html = reportTemplate('Reporte Semanal', '', reports)
  await sendEmail(html)

  console.group('Reporte Semanal:')
  console.table(reports)
  console.groupEnd()
}
