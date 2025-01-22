import { supabase } from './client.js'

export const getUsers = async () => {
  const { data, error } = await supabase.from('clockify_user').select('*')

  if (!data || error) return console.error('hubo un error: ', error)
  return data
}

export const getUser = async id => {
  const { data, error } = await supabase
    .from('clockify_user')
    .select('*')
    .eq('id', id)
    .single()

  if (!data || error) return console.error('hubo un error: ', error)
  return data
}

export const createUser = async data => {
  const { error } = await supabase
    .from('clockify_user')
    .insert({
      id: data.id,
      name: data.name,
      email: data.email,
      workspace_id: data.activeWorkspace,
    })
    .single()

  if (!data || error) return console.error('hubo un error: ', error)
  return data
}
