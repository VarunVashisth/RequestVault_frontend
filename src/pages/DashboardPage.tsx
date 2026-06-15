import { useEffect } from 'react'
import { useDashboardStore } from '@/store/dashboardStore'
import MetricCard from '@/components/ui/MetricCard'
import StatusBadge from '@/components/ui/StatusBadge'
import MethodBadge from '@/components/ui/MethodBadge'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts'
import { Activity, TrendingUp, AlertCircle, Zap, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'

export default function DashboardPage() {
  const navigate = useNavigate()
  const { metrics, loading, fetchMetrics } = useDashboardStore()

  useEffect(() => {
    fetchMetrics()
  }, [fetchMetrics])

  if (loading || !metrics) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    )
  }

  const successRate = metrics.total_requests > 0 
    ? Math.round((metrics.success_requests / metrics.total_requests) * 100)
    : 0

  // Format response times chart data from last 7 days
  const responseTrendData = metrics.responseTimesByDate
    .slice(-7)
    .map(item => ({
      name: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      avgTime: Math.round(item.avg_response_time),
    }))

  // Format request volume chart data from last 7 days
  const volumeTrendData = metrics.requestVolumeByDate
    .slice(-7)
    .map(item => ({
      name: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      count: item.count,
    }))

  // Combine for a dual-metric trend chart
  const trendData = metrics.requestVolumeByDate
    .slice(-7)
    .map((volume, idx) => {
      const timeData = metrics.responseTimesByDate[idx] || { avg_response_time: 0 }
      return {
        name: new Date(volume.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        requests: volume.count,
        avgTime: Math.round(timeData.avg_response_time),
      }
    })

  const statusDistribution = [
    { name: '2xx', value: metrics.statusDistribution['2xx'], fill: '#22C55E' },
    { name: '3xx', value: metrics.statusDistribution['3xx'], fill: '#58a6ff' },
    { name: '4xx', value: metrics.statusDistribution['4xx'], fill: '#FACC15' },
    { name: '5xx', value: metrics.statusDistribution['5xx'], fill: '#EF4444' },
    { name: '0(failed)'  , value: metrics.statusDistribution['failed'], fill: '#bd0303'}
  ].filter(s => s.value > 0)

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-vault-text">Dashboard</h1>
          <p className="text-vault-text-secondary mt-2 text-sm">Real-time API monitoring and analytics</p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Requests"
          value={metrics.total_requests.toLocaleString()}
          icon={Activity}
          change={0}
          description="All time"
        />
        <MetricCard
          title="Success Rate"
          value={`${successRate}%`}
          icon={TrendingUp}
          change={0}
          description="Status 2xx-3xx"
        />
        <MetricCard
          title="Avg Response Time"
          value={`${Math.round(metrics.avg_response_time)}ms`}
          icon={Zap}
          change={0}
          description="Milliseconds"
        />
        <MetricCard
          title="Failed Requests"
          value={metrics.failed_requests}
          icon={AlertCircle}
          change={0}
          description="Status 4xx-5xx"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Request Trend */}
        <div className="lg:col-span-2 card">
          <h2 className="text-lg font-semibold text-vault-text mb-6">Request Trend (7 Days)</h2>
          {trendData.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={trendData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#30363d" />
                <XAxis dataKey="name" stroke="#8b949e" style={{ fontSize: 12 }} />
                <YAxis stroke="#8b949e" style={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '4px' }}
                  cursor={{ stroke: '#58a6ff' }}
                  labelStyle={{ color: '#e6edf3' }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="requests"
                  stroke="#58a6ff"
                  strokeWidth={2}
                  dot={false}
                  name="Requests"
                />
                <Line
                  type="monotone"
                  dataKey="avgTime"
                  stroke="#F97316"
                  strokeWidth={2}
                  dot={false}
                  name="Avg Response Time (ms)"
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[280px] flex items-center justify-center text-vault-text-secondary">
              No data available
            </div>
          )}
        </div>

        {/* Status Distribution */}
        <div className="card">
          <h2 className="text-lg font-semibold text-vault-text mb-6">Status Distribution</h2>
          {statusDistribution.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={statusDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {statusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '4px' }}
                    labelStyle={{ color: '#e6edf3' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-6 space-y-2 text-sm">
                {statusDistribution.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }} />
                      <span className="text-vault-text-secondary">{item.name}</span>
                    </div>
                    <span className="font-medium text-vault-text">{item.value}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="h-[280px] flex items-center justify-center text-vault-text-secondary">
              No data available
            </div>
          )}
        </div>
      </div>

      {/* Top Endpoints */}
      {metrics.topEndpoints.length > 0 && (
        <div className="card">
          <h2 className="text-lg font-semibold text-vault-text mb-6">Top Endpoints</h2>
          <div className="space-y-4">
            {metrics.topEndpoints.map((endpoint, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-vault-border last:border-0">
                <div className="flex-1 min-w-0">
                  <p className="text-vault-text font-mono text-xs truncate">{endpoint.endpoint}</p>
                  <p className="text-xs text-vault-text-secondary mt-1">{endpoint.count} requests</p>
                </div>
                <div className="flex items-center gap-4 ml-4">
                  <div className="w-24 h-1.5 bg-vault-border rounded-full overflow-hidden flex-shrink-0">
                    <div
                      className="h-full bg-vault-accent"
                      style={{
                        width: `${(endpoint.count / metrics.topEndpoints[0].count) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium text-vault-text-secondary w-12 text-right flex-shrink-0">
                    {Math.round((endpoint.count / metrics.total_requests) * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Requests */}
      {metrics.recentRequests.length > 0 && (
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-vault-text">Recent Requests</h2>
            <button
              onClick={() => navigate('/requests')}
              className="text-vault-accent hover:text-vault-accent-hover transition-colors text-sm font-medium inline-flex items-center gap-1"
            >
              View all
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-vault-border">
                  <th className="text-left py-3 px-4 text-vault-text-tertiary font-medium text-xs uppercase tracking-wide">Method</th>
                  <th className="text-left py-3 px-4 text-vault-text-tertiary font-medium text-xs uppercase tracking-wide">Endpoint</th>
                  <th className="text-left py-3 px-4 text-vault-text-tertiary font-medium text-xs uppercase tracking-wide">Status</th>
                  <th className="text-left py-3 px-4 text-vault-text-tertiary font-medium text-xs uppercase tracking-wide">Time</th>
                  <th className="text-left py-3 px-4 text-vault-text-tertiary font-medium text-xs uppercase tracking-wide">IP</th>
                  <th className="text-right py-3 px-4 text-vault-text-tertiary font-medium text-xs uppercase tracking-wide">When</th>
                </tr>
              </thead>
              <tbody>
                {metrics.recentRequests.map((request) => (
                  <tr
                    key={request.id}
                    className="border-b border-vault-border hover:bg-vault-surface/50 transition-colors cursor-pointer"
                    onClick={() => navigate(`/requests/${request.id}`)}
                  >
                    <td className="py-3 px-4">
                      <MethodBadge method={request.method}/>
                    </td>
                    <td className="py-3 px-4 text-vault-text font-mono text-xs truncate max-w-xs">
                      {request.endpoint}
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={request.status_code} />
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-vault-text text-xs">{request.response_time}ms</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-xs text-vault-text-secondary">{request.ip_address || 'N/A'}</span>
                    </td>
                    <td className="py-3 px-4 text-right text-vault-text-secondary text-xs">
                      {formatDistanceToNow(new Date(request.created_at), { addSuffix: true })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
