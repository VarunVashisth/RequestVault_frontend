import api from './api'
import { Request } from '@/store/dashboardStore'

export interface RequestFilters {
  search?: string
  status_code?: number
  method?: string
  sort?: 'asc' | 'desc'
  cursor?: number
  limit?: number
}

export interface AnalyticsData {
  total_requests: number
  avg_response_time: number
  success_requests: number
  failed_requests: number
}

export interface StatusDistribution {
  '2xx': number
  '3xx': number
  '4xx': number
  '5xx': number
  failed: number
}

export const requestsService = {
  // Get paginated requests with filtering
  getRequests: async (filters?: RequestFilters): Promise<Request[]> => {
    const response = await api.get('/requests', { params: filters })
    return response.data
  },

  // Get a single request by ID
  getRequest: async (id: string | number): Promise<Request> => {
    const response = await api.get(`/requests/${id}`)
    return response.data
  },

  // Delete a single request
  deleteRequest: async (id: string | number): Promise<any> => {
    const response = await api.delete(`/requests/${id}`)
    return response.data
  },

  // Delete all requests
  deleteAllRequests: async (): Promise<any> => {
    const response = await api.delete('/requests/bulk')
    return response.data
  },

  // Delete failed requests
  deleteFailedRequests: async (): Promise<any> => {
    const response = await api.delete('/requests/failed')
    return response.data
  },

  // Get dashboard analytics
  getAnalytics: async (): Promise<AnalyticsData> => {
    const response = await api.get('/analytics')
    return response.data
  },

  // Get status distribution
  getStatusDistribution: async (): Promise<StatusDistribution> => {
    const response = await api.get('/analytics/status-distribution')
    return response.data
  },

  // Get top endpoints
  getTopEndpoints: async (limit: number = 5): Promise<Array<{ endpoint: string; count: number }>> => {
    const response = await api.get('/analytics/top-endpoints', { params: { limit } })
    return response.data
  },

  // Get response times by date
  getResponseTimes: async (): Promise<Array<{ date: string; avg_response_time: number }>> => {
    const response = await api.get('/analytics/response-times')
    return response.data
  },

  // Get request volume by date
  getRequestVolume: async (): Promise<Array<{ date: string; count: number }>> => {
    const response = await api.get('/analytics/request-volume')
    return response.data
  },

  // Get recent requests
  getRecentRequests: async (limit: number = 10): Promise<Request[]> => {
    const response = await api.get('/analytics/recent', { params: { limit } })
    return response.data
  },

  // Get errors
  getErrors: async (): Promise<Array<{ endpoint: string; count: number }>> => {
    const response = await api.get('/analytics/errors')
    return response.data
  },

  // Get slow endpoints
  getSlowEndpoints: async (limit: number = 5): Promise<Array<{ endpoint: string; avg_response_time: number }>> => {
    const response = await api.get('/analytics/slow-endpoints', { params: { limit } })
    return response.data
  },
}
