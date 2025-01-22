import { supabase } from './client.js'
import { Temporal } from '@js-temporal/polyfill'

const plaintDate = date => Temporal.PlainDate.from(date)

export const getWorkspaces = async () => {
  const { data, error } = await supabase.from('clockify_workspace').select('*')

  if (!data || error) return console.error('hubo un error: ', error)
  return data
}

export const getWorkspace = async id => {
  const { data, error } = await supabase
    .from('clockify_workspace')
    .select('*')
    .eq('id', id)
    .single()

  if (!data || error) return console.error('hubo un error: ', error)
  return data
}

export const createWorkspace = async data => {
  const { error } = await supabase.from('clockify_workspace').insert({
    id: data.id,
    name: data.name,
  })

  if (!data || error) return console.error('hubo un error: ', error)
  return data
}

export const getEligibleWorkspaces = async () => {
  const workspaces = await getWorkspaces()
  const yesterday = Temporal.Now.plainDateISO().subtract({ days: 1 })
  const eligibleWorkspaces = []

  workspaces.filter(workspace => {
    const { subscription_start_date, subscription_end_date } = workspace
    if (!subscription_start_date || !subscription_end_date) return

    const startDate = plaintDate(subscription_start_date)
    const endDate = plaintDate(subscription_end_date)

    const daysDifference = endDate.since(startDate).total({ unit: 'days' })

    if (daysDifference === 30 && endDate.toString() === yesterday.toString())
      eligibleWorkspaces.push(workspace)
  })

  return eligibleWorkspaces
}
