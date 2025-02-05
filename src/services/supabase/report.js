import { supabase } from './client.js'

export const getDailyReports = async () => {
  const { data, error } = await supabase
    .from('clockify_daily_report')
    .select('*')

  if (error) console.error('❌ Hubo un error: ', error)

  return data || []
}

export const summarizeReport = async (reports, date) => {
  const reportMap = new Map()

  reports.forEach(
    ({ email, talent, company, phone, total_hours, total_payment }) => {
      const key = `${talent.trim()}-${company.trim()}`

      if (!reportMap.has(key))
        reportMap.set(key, {
          email,
          talent: talent.trim(),
          company: company.trim(),
          phone: phone || null,
          total_hours: 0,
          total_payment: 0,
          start_date: date.start_date || null,
          end_date: date.end_date || null,
        })

      const record = reportMap.get(key)
      record.total_hours += total_hours || 0
      record.total_payment += total_payment || 0
      reportMap.set(key, record)
    }
  )

  return Array.from(reportMap.values())
}
