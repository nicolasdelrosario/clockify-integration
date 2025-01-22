import { reportStyles } from './reportStyles.js'

export const reportTemplate = (title, subtitle, report) => {
  const rows = report
    .map(
      entry => `
      <tr class="table__row">
        <td>${entry.company}</td>
        <td>${entry.talent}</td>
        <td>${entry.total_hours}</td>
        <td>${entry.total_payment.toFixed(2)}</td>
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
        <h1 class="title">${title}</h1>
        <p class="subtitle">${subtitle}</p>
        <table class="table">
          <thead class="table__head">
            <tr class="table__row">
              <th>Empresa</th>
              <th>Talento</th>
              <th>Horas Totales</th>
              <th>Pago Total</th>
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
