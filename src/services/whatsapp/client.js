import pkg from 'whatsapp-web.js'
import qrcode from 'qrcode-terminal'

const { Client, LocalAuth } = pkg

let client
let isReady = false

const initializeClient = () => {
  return new Promise(resolve => {
    client = new Client({
      authStrategy: new LocalAuth(),
      puppeteer: {
        args: ['--no-sandbox'],
      },
    })

    client.on('qr', qr => {
      qrcode.generate(qr, { small: true })
    })

    client.on('ready', () => {
      console.log('WhatsApp client is ready!')
      isReady = true
      resolve()
    })

    client.initialize()
  })
}

export const sendWhatsAppMessage = async (phone, message) => {
  try {
    if (!isReady) await initializeClient()

    const formattedPhone = `51${phone}@c.us`
    await client.sendMessage(formattedPhone, message)
    console.log('WhatsApp message sent successfully')
  } catch (error) {
    console.error('Error sending WhatsApp message:', error)
  }
}
