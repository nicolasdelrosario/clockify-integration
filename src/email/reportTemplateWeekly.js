import { reportStyles } from './reportStyles.js'

export const reportTemplateWeekly = report => {
  const rows = report
    .map(
      entry => `
      <tr class="table__row">
        <td>${entry.company}</td>
        <td>${entry.talent}</td>
        <td>${entry.total_hours}</td>
        <td>${entry.start_date}</td>
        <td>${entry.end_date}</td>
      </tr>
    `
    )
    .join('')

  return `
    <html>
      <head>
        <style>
          ${reportStyles}
        </style>
      </head>
      <body>
        <h1 class="title">Seguimiento semanal de las horas registradas de los talentos</h1>
        <p class="subtitle">Información de las horas trabajadas:</p>
        <table class="table">
          <thead class="table__head">
            <tr class="table__row">
              <th>Empresa</th>
              <th>Talento</th>
              <th>Horas Utilizadas</th>
              <th>Fecha Inicio</th>
              <th>Fecha Fin</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </body>
    </html>
  `
}
