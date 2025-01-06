import { Temporal } from '@js-temporal/polyfill'

export const getStartAndEndOfWeek = () => {
  const today = Temporal.Now.plainDateISO()

  const startOfWeek = today.subtract({ days: today.dayOfWeek - 1 })
  const endOfWeek = startOfWeek.add({ days: 5 })

  const startDate = `${startOfWeek.toString()}T00:00:00Z`
  const endDate = `${endOfWeek.toString()}T23:59:59Z`

  return {
    startDate,
    endDate,
  }
}
