import { supabase } from './client.js'

export const getUser = async id => {
  const { data, error } = await supabase
    .from('clockify_user')
    .select('*')
    .eq('id', id)
    .single()

  if (!data) return
  if (error) return

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

  if (error) throw new Error(error.message)

  return data
}
