import dotenv from 'dotenv'

dotenv.config()

export const env = {
  clockifyUrl: process.env.CLOCKIFY_URL,
  clockifyApiKey: process.env.CLOCKIFY_API_KEY,
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseKey: process.env.SUPABASE_KEY,
}
