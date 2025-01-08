import { clockify } from './client.js'

export const getWorkspaces = async () => {
  const { data } = await clockify.get('/workspaces')
  return data
}
