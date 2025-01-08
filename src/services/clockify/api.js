import axios from 'axios'

// Configuración de Axios para autenticación con API
export const createApiInstance = (baseURL, apiKey) => {
  return axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': apiKey,
    },
  })
}
