import { reportStyles } from '../reportStyles.js'

export const userMonthlyTemplate = (
  talent,
  { total_hours, subscription_hours, remaining_hours, total_payment },
  { start_date, end_date }
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
            <h1 class="title">Reporte Mensual de Horas</h1>
            
            <p class="greeting">¡Hola ${talent}! 👋</p>
            
            <div class="hours-card">
              <p>Resumen de tus horas este mes:</p>
              <div class="stats-grid">
                <div class="stat-item">
                  <span class="stat-label">Horas Registradas</span>
                  <div class="stat-value">${total_hours}hrs ⏱️</div>
                </div>
                <div class="stat-item">
                  <span class="stat-label">Horas Solicitadas</span>
                  <div class="stat-value">${subscription_hours}hrs 📋</div>
                </div>
                <div class="stat-item">
                  <span class="stat-label">Horas No Utilizadas</span>
                  <div class="stat-value">${remaining_hours}hrs ⌛</div>
                </div>
                <div class="stat-item">
                  <span class="stat-label">Pago del Mes</span>
                  <div class="stat-value">S/${total_payment.toFixed(2)} 💰</div>
                </div>
              </div>
            </div>

            <div class="period-box">
              📅 Periodo: ${start_date.split('T')[0]} - ${end_date.split('T')[0]}
            </div>

            <div class="note">
              <p>Nota: este monto es referencial, por favor validarlo con tu tutor asignado.</p>
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
