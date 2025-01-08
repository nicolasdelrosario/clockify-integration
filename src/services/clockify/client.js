import { createApiInstance } from './api.js'

import { env } from '../../config/env.js'

const { clockifyUrl, clockifyApiKey } = env

if (!clockifyUrl || !clockifyApiKey)
  throw new Error('Missing Clockify credentials')

export const clockify = createApiInstance(clockifyUrl, clockifyApiKey)
