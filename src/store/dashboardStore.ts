import { create } from 'zustand'
import { requestsService, AnalyticsData } from '@/services/requestsService'

export interface Request {
  id?: string | number
  endpoint: string
  status_code: number
  response_time: number
  created_at: string
  method?: string
  ip_address?: string
  useragent?: string
  request_body?: string
  response_body?: string
  request_headers?: Record<string, string>
  response_headers?: Record<string, string>
}

export interface DashboardMetrics extends AnalyticsData {
  recentRequests: Request[]
  topEndpoints: Array<{ endpoint: string; count: number }>
  statusDistribution: {
    '2xx': number
    '3xx': number
    '4xx': number
    '5xx': number
    failed: number
  }
  responseTimesByDate: Array<{ date: string; avg_response_time: number }>
  requestVolumeByDate: Array<{ date: string; count: number }>
}

interface DashboardState {
  metrics: DashboardMetrics | null
  loading: boolean
  error: string | null
  fetchMetrics: () => Promise<void>
}

export const useDashboardStore = create<DashboardState>((set) => ({
  metrics: null,
  loading: false,
  error: null,

  fetchMetrics: async () => {
    set({ loading: true, error: null })
    try {
      // Fetch all analytics data in parallel using dedicated endpoints
      const [analytics, recentRequests, topEndpoints, statusDistribution, responseTimes, requestVolume] = 
        await Promise.all([
          requestsService.getAnalytics(),
          requestsService.getRecentRequests(10),
          requestsService.getTopEndpoints(5),
          requestsService.getStatusDistribution(),
          requestsService.getResponseTimes(),
          requestsService.getRequestVolume(),
        ])

      set({ 
        metrics: {
          ...analytics,
          recentRequests,
          topEndpoints,
          statusDistribution,
          responseTimesByDate: responseTimes,
          requestVolumeByDate: requestVolume,
        }
      })
    } catch (error: any) {
      set({ error: error.message || 'Failed to fetch metrics' })
    } finally {
      set({ loading: false })
    }
  },
}))
