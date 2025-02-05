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
