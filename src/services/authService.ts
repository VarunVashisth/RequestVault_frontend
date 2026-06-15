import api from './api'

export interface LoginRequest {
  username: string
  password: string
}

export interface RegisterRequest {
  username: string
  password: string
}

export interface LoginResponse {
  access_token: string
  token_type: string
}

export interface RegisterResponse {
  username: string
  api_key: string
}





export const authService = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post('/login', data)
    return response.data
  },

  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response = await api.post('/register', data)
    return response.data
  },

  logout: async (): Promise<void> => {
    // Backend doesn't have logout endpoint, just clear local storage
  },

  getCurrentUser: async () => {
      const response = await api.get('/auth/me')
      return response.data
  },


}
