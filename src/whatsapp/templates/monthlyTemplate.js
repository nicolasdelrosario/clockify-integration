export const monthlyTemplate = reports => {
  return (
    `📊 *Reporte Mensual*\n\n` +
    `📅 Periodo: ${reports[0]?.start_date.split('T')[0]} - ${reports[0]?.end_date.split('T')[0]}\n\n` +
    `*Detalles por Talento:*\n` +
    reports
      .map(
        report =>
          `• ${report.talent} (${report.company}):\n` +
          `  - Horas solicitadas: ${report.subscription_hours}hrs\n` +
          `  - Horas registradas: ${report.total_hours}hrs\n` +
          `  - Horas restantes: ${report.remaining_hours}hrs\n` +
          `  - Pago al talento: S/${report.total_payment.toFixed(2)}`
      )
      .join('\n\n')
  )
}
