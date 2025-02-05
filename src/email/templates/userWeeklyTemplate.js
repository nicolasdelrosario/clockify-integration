import { reportStyles } from '../reportStyles.js'

export const userWeeklyTemplate = (
  talent,
  total_hours,
  { startDate, endDate }
) => {
  return `
    <html>
      <head>
        <style>${reportStyles}</style>
      </head>
      <body>
        <div class="container">
          <div class="banner"></div>
          <div class="content">
            <h1 class="title">Reporte Semanal de Horas</h1>
            
            <p class="greeting">¡Hola ${talent}! 👋</p>
            
            <div class="hours-card">
              <p>Tus horas registradas de la semana han sido:</p>
              <div class="hours-value">${total_hours}hrs ⏱️</div>
            </div>

            <div class="period-box">
              📅 Periodo: ${startDate.split('T')[0]} - ${endDate.split('T')[0]}
            </div>

            <div class="footer">
              <p class="footer-cta">¡Gracias por confiar en LetyMind!</p>
              <p>Estamos muy entusiasmados de trabajar contigo.</p>
               <a href="https://letymind.com" class="powered-by">
                Powered by Letymind ✨
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  `
}
