import api from './api'

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  username: string
  email: string
  password: string
}

export interface LoginResponse {
  access_token: string
  token_type: string
}

export interface RegisterResponse {
  username: string
  email: string
  api_key: string
}

export interface RequestOtpRequest {
  username: string
  email: string
  password: string
}

export interface VerifyOtpRequest {
  username: string
  email: string
  password: string
  otp: string
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

  requestOtp: async (
    data: RequestOtpRequest
  ) => {
  
    const response = await api.post(
      '/register/request-otp',
      data
    )
  
    return response.data
  },

  verifyOtp: async (
    data: VerifyOtpRequest
  ) => {
  
    const response = await api.post(
      '/register/verify-otp',
      data
    )
  
    return response.data
  },
}
