import { clockify } from './client.js'

export const getTimeEntries = async (
  workspaceId,
  userId,
  startDate,
  endDate
) => {
  const { data } = await clockify.get(
    `/workspaces/${workspaceId}/user/${userId}/time-entries`,
    {
      params: { start: startDate, end: endDate },
    }
  )

  return data
}
