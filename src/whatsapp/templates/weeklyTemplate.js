export const weeklyTemplate = (reports, { startDate, endDate }) => {
  return (
    `📊 *Reporte Semanal*\n\n` +
    `📅 Periodo: ${startDate.split('T')[0]} - ${endDate.split('T')[0]}\n\n` +
    `*Detalles por Talento:*\n` +
    reports
      .map(
        report =>
          `• ${report.talent} (${report.company}): ${report.total_hours}hrs`
      )
      .join('\n')
  )
}
