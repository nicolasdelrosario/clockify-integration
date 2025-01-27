import { reportStyles } from './reportStyles.js'

export const reportComercialTemplate = report => {
  const rows = report
    .map(
      entry => `
      <tr class="table__row">
        <td>${entry.company}</td>
        <td>${entry.talent}</td>
        <td>${entry.remaining_hours || 0}</td>
        <td>S/${(entry.letycash || 0).toFixed(2)}</td>
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
        <h1 class="title">Reporte de suscripción de talentos para comercial</h1>
        <p class="subtitle">Detalle de los pagos a realizar:</p>
        <table class="table">
          <thead class="table__head">
            <tr class="table__row">
              <th>Empresa</th>
              <th>Talento</th>
              <th>Horas Restantes</th>
              <th>Letycash</th>
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
