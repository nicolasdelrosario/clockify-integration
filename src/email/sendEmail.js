import { Resend } from 'resend'
import { env } from '../config/env.js'

const { resendApiKey, letyMindEmail, emailRecipients } = env

const resend = new Resend(resendApiKey)

export async function sendEmail(data) {
  const recipients = emailRecipients.split(',').map(email => email.trim())

  if (!recipients || recipients.length === 0)
    return console.error('No hay destinatarios al que enviar el correo.')

  const { error } = await resend.emails.send({
    from: letyMindEmail,
    to: recipients,
    subject: 'Seguimiento semanal de uso de horas.',
    html: data,
  })

  if (!data || error) return console.error('hubo un error: ', error)
}
