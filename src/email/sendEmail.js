import { Resend } from 'resend'
import { env } from '../config/env.js'

const { resendApiKey, letyMindEmail, emailRecipients } = env

const resend = new Resend(resendApiKey)

export async function sendEmail(htmlContent) {
  const recipients = emailRecipients.split(',').map(email => email.trim())

  if (!recipients || recipients.length === 0)
    return console.error('No hay destinatarios.')

  const { error } = await resend.emails.send({
    from: letyMindEmail,
    to: recipients,
    subject: 'Seguimiento semanal de uso de horas.',
    html: htmlContent,
  })

  if (error) return console.error({ error })

  console.log('Correo enviado correctamente')
}
