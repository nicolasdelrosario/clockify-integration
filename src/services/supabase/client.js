import { createClient } from '@supabase/supabase-js'
import { env } from '../../config/env.js'

const { supabaseUrl, supabaseApiKey } = env

if (!supabaseUrl || !supabaseApiKey)
  throw new Error('❌ Faltan las credenciales de supabase')

export const supabase = createClient(supabaseUrl, supabaseApiKey)
