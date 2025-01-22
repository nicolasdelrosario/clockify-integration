export const calculateTotalHours = timeEntries => {
  // Total de horas y minutos
  const total = timeEntries.reduce((sum, entry) => {
    const duration = entry.timeInterval?.duration || 'PT0H0M'
    const match = duration.slice(2).split('H')
    const hours = match.length > 1 ? parseInt(match[0], 10) : 0
    const minutes = match[match.length - 1].includes('M')
      ? parseInt(match[match.length - 1].replace('M', ''), 10)
      : 0

    return sum + hours + minutes / 60
  }, 0)

  // Redondeo de 0, 0.5 o 1
  const rounded = Math.round(total * 2) / 2

  return rounded < 0 ? 0 : rounded
}
