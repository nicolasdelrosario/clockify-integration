import { Temporal } from '@js-temporal/polyfill'

export const getStartAndEndOfMonth = () => {
  const today = Temporal.Now.plainDateISO()

  const startOfMonth = today.with({ day: 1 })
  const endOfMonth = startOfMonth.add({ months: 1 }).subtract({ days: 1 })

  const startDate = `${startOfMonth.toString()}T00:00:00Z`
  const endDate = `${endOfMonth.toString()}T23:59:59Z`

  return {
    startDate,
    endDate,
  }
}
