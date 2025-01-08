import { clockify } from './client.js'

export const getUsers = async id => {
  const { data } = await clockify.get(`/workspaces/${id}/users`)
  return data
}
