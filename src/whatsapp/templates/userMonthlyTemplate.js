export const userMonthlyTemplate = (
  talent,
  { total_hours, subscription_hours, remaining_hours, total_payment },
  { start_date, end_date }
) => {
  return (
    `¡Hola ${talent}! 👋\n\n` +
    `Te informamos el resumen de tus horas este mes:\n\n` +
    `📊 *Detalles:*\n` +
    `• Horas Registradas: ${total_hours}hrs ⏱️\n` +
    `• Horas Solicitadas: ${subscription_hours}hrs 📋\n` +
    `• Horas Restantes: ${remaining_hours}hrs ⌛\n` +
    `• Pago del Mes: S/${total_payment.toFixed(2)} 💰\n\n` +
    `📅 Periodo: ${start_date.split('T')[0]} - ${end_date.split('T')[0]}`
  )
}
