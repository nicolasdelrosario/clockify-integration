import { reportStyles } from '../reportStyles.js'

export const reportTemplateWeekly = report => {
  const rows = report
    .map(
      entry => `
      <tr class="table__row">
        <td>${entry.company}</td>
        <td>${entry.talent}</td>
        <td class="hours center">${entry.total_hours}hrs</td>
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
          <h1 class="report-title">Seguimiento Semanal de Horas</h1>
          <p class="report-subtitle">Información de las horas registradas del periodo</p>
          
          <div class="table-container">
            <table class="table">
              <thead class="table__head">
                <tr>
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
