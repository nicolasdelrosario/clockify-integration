export const userWeeklyTemplate = (
  talent,
  total_hours,
  { startDate, endDate }
) => {
  return (
    `¡Hola ${talent}! 👋\n\n` +
    `Te informamos que tus horas registradas de la semana han sido: ${total_hours}hrs\n` +
    `📅 Periodo: ${startDate.split('T')[0]} - ${endDate.split('T')[0]}\n`
  )
}
