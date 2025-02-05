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
      console.log('✅ El cliente de whatsapp está listo')
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
    console.log('✅ El mensaje de whatsapp fue enviado correctamente')
  } catch (error) {
    console.error('❌ Error enviando el mensaje:', error)
  }
}

// envio talentos: correo y ws
