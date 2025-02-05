import { supabase } from './client.js'

export const getPaymentPerHour = async id => {
  const { data, error } = await supabase
    .from('clockify_user_level')
    .select('*')
    .eq('id', id)
    .single()

  if (!data || error) return console.error('❌ Hubo un error: ', error)
  return data
}

export const getPaymentPerHourWorkspace = async id => {
  const { data, error } = await supabase
    .from('clockify_workspace_level')
    .select('*')
    .eq('id', id)
    .single()

  if (!data || error) return console.error('❌ Hubo un error: ', error)
  return data
}

export const registerDailyPayment = async data => {
  const { error } = await supabase.from('clockify_daily_report').insert(data)

  if (error) console.error('❌ Hubo un error: ', error)
  return
}

export const registerWeeklyPayment = async data => {
  const { error } = await supabase.from('clockify_weekly_report').insert(data)

  if (error) console.error('❌ Hubo un error: ', error)
  return
}

export const registerMonthlyPayment = async data => {
  const { error } = await supabase.from('clockify_monthly_report').insert(data)

  if (error) console.error('❌ Hubo un error: ', error)
  return
}
