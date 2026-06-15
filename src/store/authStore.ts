import { create } from 'zustand'
import { authService } from '@/services/authService'

export interface User {
  id?: string
  username: string
  email?: string
  api_key?: string
}

interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
  error: string | null
  login: (username: string, password: string) => Promise<void>
  register: (username: string,  password: string) => Promise<void>
  logout: () => void
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
  checkAuth: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('auth_token'),
  loading: false,
  error: null,

  login: async (username: string, password: string) => {
    set({ loading: true, error: null })
  
    try {
      const response = await authService.login({
        username,
        password
      })
  
      localStorage.setItem(
        'auth_token',
        response.access_token
      )
  
      set({
        user: { username },
        token: response.access_token
      })
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.detail ||
        'Login failed'
  
      set({ error: errorMsg })
  
      throw error
    } finally {
      set({ loading: false })
    }
  },

  register: async (
    username: string,
    password: string
  ) => {
  
    set({
      loading: true,
      error: null
    })
  
    try {
  
      const response =
        await authService.register({
          username,
          password
        })
  
      localStorage.setItem(
        'auth_token',
        response.api_key
      )
  
      set({
        user: {
          username,
          api_key: response.api_key
        },
        token: response.api_key
      })
  
    } catch (error: any) {
  
      const errorMsg =
        error.response?.data?.detail ||
        'Registration failed'
  
      set({ error: errorMsg })
  
      throw error
  
    } finally {
  
      set({ loading: false })
  
    }
  },

  logout: () => {
    localStorage.removeItem('auth_token')
    set({ user: null, token: null })
  },

  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),

  checkAuth: async () => {
    const token = localStorage.getItem('auth_token')
    if (!token) {
      set({
        user: null,
        token: null,
        loading: false,
      })
      return
    }

    set({
      loading:true,
    })
    try{
      const user = await authService.getCurrentUser()

      set({
        token,
        user ,
        loading:false,
      })
    }
    catch{
      localStorage.removeItem("auth_token")

      set({
        token:null,
        user:null,
        loading:false,
      })
    }
  },
}))
