import { supabase } from './client.js'

export const getWorkspace = async id => {
  const { data, error } = await supabase
    .from('clockify_workspace')
    .select('*')
    .eq('id', id)
    .single()

  if (!data) return
  if (error) return

  return data
}

export const createWorkspace = async data => {
  const { error } = await supabase
    .from('clockify_workspace')
    .insert({
      id: data.id,
      name: data.name,
    })
    .single()

  if (error) throw new Error(error.message)

  return data
}
