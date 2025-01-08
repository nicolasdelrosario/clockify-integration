import { createClient } from '@supabase/supabase-js'
import { env } from '../../config/env.js'

const { supabaseUrl, supabaseKey } = env

if (!supabaseUrl || !supabaseKey)
  throw new Error('Missing Supabase credentials')

export const supabase = createClient(supabaseUrl, supabaseKey)
