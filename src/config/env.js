import dotenv from 'dotenv'

dotenv.config()

export const env = {
  clockifyUrl: process.env.CLOCKIFY_URL,
  clockifyApiKey: process.env.CLOCKIFY_API_KEY,
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseApiKey: process.env.SUPABASE_KEY,
  resendApiKey: process.env.RESEND_API_KEY,
}
