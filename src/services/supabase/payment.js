import { Temporal } from '@js-temporal/polyfill'
import { supabase } from './client.js'

const today = Temporal.Now.plainDateISO()

export const registerMonthlyPayment = async data => {
  const { subscription_start_date, ...payment } = data
  if (subscription_start_date === null) return

  if (subscription_start_date != null) {
    const subscriptionStart = Temporal.PlainDate.from(subscription_start_date)

    const daysDifference = subscriptionStart
      .until(today)
      .total({ unit: 'days' })

    if (daysDifference > 30) {
      const { error } = await supabase
        .from('clockify_payment')
        .insert({
          user_id: payment.user_id,
          workspace_id: payment.workspace_id,
          talent: payment.talent,
          company: payment.company,
          total_hours: payment.total_hours,
          total_payment: payment.total_payment,
          start_date: subscription_start_date,
          end_date: today,
          total_days: daysDifference,
        })
        .single()

      if (error) throw new Error(error.message)

      return data
    }
  }
}

export const registerWeeklyPayment = async data => {
  const startDate = Temporal.PlainDate.from(data.start_date.split('T')[0])
  const daysDifference = startDate.until(today).total({ unit: 'days' })

  const { error } = await supabase
    .from('clockify_payment')
    .insert({
      user_id: data.user_id,
      workspace_id: data.workspace_id,
      talent: data.talent,
      company: data.company,
      total_hours: data.total_hours,
      total_payment: data.total_payment,
      start_date: data.start_date,
      end_date: data.end_date,
      total_days: daysDifference,
    })
    .single()

  if (error) throw new Error(error.message)

  return data
}
