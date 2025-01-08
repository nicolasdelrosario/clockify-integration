import { supabase } from './client.js'

export const getPaymentPerHour = async id => {
  const { data, error } = await supabase
    .from('clockify_user_level')
    .select('*')
    .eq('id', id)
    .single()

  if (!data) throw new Error('user level not found')
  if (error) throw new Error(error.message)

  return data
}
