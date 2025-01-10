import { createClient } from '@supabase/supabase-js'
import { env } from '../../config/env.js'

const { supabaseUrl, supabaseApiKey } = env

if (!supabaseUrl || !supabaseApiKey)
  throw new Error('Missing Supabase credentials')

export const supabase = createClient(supabaseUrl, supabaseApiKey)
