import { Temporal } from '@js-temporal/polyfill'

export const getStartAndEndOfLastWeek = () => {
  const today = Temporal.Now.plainDateISO()

  const lastWeek = today.subtract({ days: 7 })

  const stratOfLastWeek = lastWeek.subtract({ days: lastWeek.dayOfWeek - 1 })
  const endOfLastWeek = stratOfLastWeek.add({ days: 6 })

  const startDate = `${stratOfLastWeek.toString()}T00:00:00Z`
  const endDate = `${endOfLastWeek.toString()}T23:59:59Z`

  return {
    startDate,
    endDate,
  }
}
