import { reportStyles } from '../reportStyles.js'

export const reportTemplateMonthly = report => {
  const rows = report
    .map(
      entry => `
      <tr class="table__row">
        <td>${entry.company}</td>
        <td>${entry.talent}</td>
        <td class="hours center">${entry.subscription_hours}hrs</td>
        <td class="hours center">${entry.total_hours}hrs</td>
        <td class="hours center">${entry.remaining_hours}hrs</td>
        <td class="amount center">S/${entry.total_payment.toFixed(2)}</td>
        <td class="center">${entry.start_date.split('T')[0]}</td>
        <td class="center">${entry.end_date.split('T')[0]}</td>
      </tr>
    `
    )
    .join('')

  return `
    <html>
      <head>
        <style>${reportStyles}</style>
      </head>
      <body>
        <div class="report-container">
          <div class="banner"></div>
          <h1 class="report-title">Reporte de Suscripción de Talento</h1>
          <p class="report-subtitle">Detalle de los pagos a realizar del periodo</p>
          
          <div class="table-container">
            <table class="table">
              <thead class="table__head">
                <tr>
                  <th>Empresa</th>
                  <th>Talento</th>
                  <th>Horas Solicitadas</th>
                  <th>Horas Registradas</th>
                  <th>Horas Restantes</th>
                  <th>Pago Talento</th>
                  <th>Fecha Inicio</th>
                  <th>Fecha Fin</th>
                </tr>
              </thead>
              <tbody>
                ${rows}
              </tbody>
            </table>
          </div>

          <div class="footer">
              <p class="footer-cta">¡Gracias por confiar en LetyMind!</p>
              <p>Estamos muy entusiasmados de trabajar contigo.</p>
               <a href="https://letymind.com" class="powered-by">
                Powered by Letymind ✨
              </a>
          </div>
        </div>
      </body>
    </html>
  `
}
