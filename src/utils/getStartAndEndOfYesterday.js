import { Temporal } from '@js-temporal/polyfill'

/**
 * Obtiene las fechas de inicio y fin del día anterior.
 * @returns {Object} Objeto con `startDate` y `endDate` en formato ISO con zona horaria UTC.
 */
export const getStartAndEndOfYesterday = () => {
  const today = Temporal.Now.plainDateISO()
  const yesterday = today.subtract({ days: 1 })

  const startDate = `${yesterday.toString()}T00:00:00Z`
  const endDate = `${yesterday.toString()}T23:59:59Z`

  return {
    startDate,
    endDate,
  }
}
