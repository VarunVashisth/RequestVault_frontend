import api from './api'

export interface ApiKey {
  api_key: string
  created_at: string
}

export const apiKeysService = {
  getApiKey: async (): Promise<ApiKey> => {
    const response = await api.get('/api-keys')
    return response.data
  },

  regenerateApiKey: async (): Promise<ApiKey> => {
    const response = await api.post('/api-keys/regeneration')
    return response.data
  },
}