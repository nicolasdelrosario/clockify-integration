import { Resend } from 'resend'
import { env } from '../config/env.js'

const { resendApiKey, letyMindEmail, emailRecipients } = env

const resend = new Resend(resendApiKey)

export async function sendEmail(data, recipients, subject) {
  const finalRecipients =
    recipients || emailRecipients.split(',').map(email => email.trim())

  if (!finalRecipients || finalRecipients.length === 0)
    return console.error('No hay destinatarios al que enviar el correo.')

  const { error } = await resend.emails.send({
    from: letyMindEmail,
    to: finalRecipients,
    subject: subject,
    html: data,
  })

  if (!data || error) return console.error('hubo un error: ', error)
}
