import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { requestsService } from '@/services/requestsService'
import { Request } from '@/store/dashboardStore'
import StatusBadge from '@/components/ui/StatusBadge'
import MethodBadge  from '@/components/ui/MethodBadge'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import EmptyState from '@/components/ui/EmptyState'
import { Search, Filter, ChevronLeft, ChevronRight, FileText, Trash2, AlertTriangle } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

export default function RequestsPage() {
  const navigate = useNavigate()

  const [requests, setRequests] = useState<Request[]>([])
  const [cursor, setCursor] = useState<number | null>(null)
  const [search, setSearch] = useState('')
  const [methodFilter, setMethodFilter] = useState<string>('')
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [totalCount, setTotalCount] = useState(0)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<'single' | 'failed' | 'all' | null>(null)
  const [deletingId, setDeletingId] = useState<number | string | null>(null)
  const [isDeleting , setIsDeleting] = useState(false)
  const pageSize = 20
  const HTTP_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS']
  const STATUSES = ['2xx', '3xx', '4xx', '5xx']

  const fetchRequests = async (newCursor?: number | null) => {
    setLoading(true)
    try {
      const statusCode = statusFilter ? parseInt(statusFilter.slice(0, 1) + '00') : undefined
      const filters: any = {
        limit: pageSize,
        search: search || undefined,
        status_code: statusCode,
        method: methodFilter || undefined,
        sort: sortOrder,
      }
      
      if (newCursor !== undefined && newCursor !== null) {
        filters.cursor = newCursor
      }
      
      console.log(filters)

      const data = await requestsService.getRequests(filters)
      setRequests(data)
      setHasMore(data.length === pageSize)
      
      // Set cursor to last request's ID for pagination
      if (data.length > 0 && data[data.length - 1].id) {
        setCursor(data[data.length - 1].id as number)
      }
    } catch (err) {
      console.error('Failed to fetch requests:', err)
      setRequests([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setCursor(null)
    fetchRequests(null)
  }, [search, methodFilter, statusFilter, sortOrder])

  const handleDeleteRequest = async (id: number | string) => {
    setIsDeleting(true)
  
    try {
      await requestsService.deleteRequest(id)
  
      fetchRequests(null)
  
      setShowDeleteConfirm(null)
    } catch (err) {
      console.error(err)
    } finally {
      setIsDeleting(false)
      setDeletingId(null)
    }
  }

  const handleDeleteFailed = async () => {
    try {
      await requestsService.deleteFailedRequests()
      fetchRequests(null)
      setShowDeleteConfirm(null)
    } catch (err) {
      console.error('Failed to delete failed requests:', err)
    }
  }

  const handleDeleteAll = async () => {
    try {
      await requestsService.deleteAllRequests()
      setRequests([])
      setCursor(null)
      setShowDeleteConfirm(null)
    } catch (err) {
      console.error('Failed to delete all requests:', err)
    }
  }

  const handleNextPage = () => {
    if (hasMore && requests.length > 0) {
      const lastId = requests[requests.length - 1].id as number
      fetchRequests(lastId)
    }
  }

  const handlePrevPage = () => {
    // For previous page, we'd need to fetch from the beginning with limit
    // This is a simplified version - for full pagination, you might want cursor-based approach
    setCursor(null)
    fetchRequests(null)
  }

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-vault-text">Requests</h1>
          <p className="text-vault-text-secondary mt-1 text-sm">View and filter all API requests</p>
        </div>
        <div className="flex gap-2">
          {requests.length > 0 && (
            <>
              <button
                onClick={() => setShowDeleteConfirm('failed')}
                className="btn-secondary px-4 py-2 text-sm flex items-center gap-2"
              >
                <AlertTriangle size={16} />
                Delete Failed
              </button>
              <button
                onClick={() => setShowDeleteConfirm('all')}
                className="btn-secondary px-4 py-2 text-sm flex items-center gap-2 text-vault-danger"
              >
                <Trash2 size={16} />
                Delete All
              </button>
            </>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="card space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-vault-text-secondary" size={18} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by endpoint..."
            className="input-base pl-10 w-full"
          />
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2 text-sm text-vault-text-secondary">
            <Filter size={16} />
            <span>Filter:</span>
          </div>

          {/* Method filter */}
          <select
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
            className="input-base text-sm"
          >
            <option value="">All Methods</option>
            {HTTP_METHODS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-base text-sm"
          >
            <option value="">All Statuses</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          {/* Sort order */}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
            className="input-base text-sm"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>

          {/* Clear filters */}
          {(search || methodFilter || statusFilter) && (
            <button
              onClick={() => {
                setSearch('')
                setMethodFilter('')
                setStatusFilter('')
              }}
              className="text-vault-accent hover:text-vault-accent-hover text-sm font-medium"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Requests table */}
      {requests.length === 0 && !loading ? (
        <EmptyState
          icon={FileText}
          title="No requests found"
          description="Try adjusting your search or filters to find requests"
        />
      ) : (
        <>
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-vault-border">
                    <th className="text-left py-3 px-4 text-vault-text-secondary font-medium text-xs uppercase tracking-wide">Method</th>
                    <th className="text-left py-3 px-4 text-vault-text-secondary font-medium text-xs uppercase tracking-wide">Endpoint</th>
                    <th className="text-left py-3 px-4 text-vault-text-secondary font-medium text-xs uppercase tracking-wide">Status</th>
                    <th className="text-left py-3 px-4 text-vault-text-secondary font-medium text-xs uppercase tracking-wide">Response Time</th>
                    <th className="text-left py-3 px-4 text-vault-text-secondary font-medium text-xs uppercase tracking-wide">IP Address</th>
                    <th className="text-left py-3 px-4 text-vault-text-secondary font-medium text-xs uppercase tracking-wide">When</th>
                    <th className="text-right py-3 px-4 text-vault-text-secondary font-medium text-xs uppercase tracking-wide">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={7} className="py-12">
                        <div className="flex justify-center">
                          <LoadingSpinner />
                        </div>
                      </td>
                    </tr>
                  ) : (
                    requests.map((request) => (
                      <tr
                        key={request.id}
                        className="border-b border-vault-border hover:bg-vault-surface/50 transition-colors"
                      >
                        <td className="py-3 px-4">
                          <MethodBadge method={request.method}/>
                        </td>
                        <td 
                          className="py-3 px-4 text-vault-text font-mono text-xs max-w-xs truncate cursor-pointer hover:underline"
                          onClick={() => navigate(`/requests/${request.id}`)}
                        >
                          {request.endpoint}
                        </td>
                        <td className="py-3 px-4">
                          <StatusBadge status={request.status_code} />
                        </td>
                        <td className="py-3 px-4 text-vault-text text-xs">{request.response_time}ms</td>
                        <td className="py-3 px-4 text-vault-text-secondary text-xs">{request.ip_address || 'N/A'}</td>
                        <td className="py-3 px-4 text-vault-text-secondary text-xs">
                          {formatDistanceToNow(new Date(request.created_at), { addSuffix: true })}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => navigate(`/requests/${request.id}`)}
                              className="text-vault-accent hover:text-vault-accent-hover text-xs font-medium"
                            >
                              View
                            </button>
                            <button
                              onClick={() => {
                                setDeletingId(request.id)
                                setShowDeleteConfirm('single')
                              }}
                              className="text-vault-danger hover:text-vault-danger text-xs font-medium"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-vault-text-secondary">
              Showing {requests.length} requests {hasMore && '(load more available)'}
            </span>
            <div className="flex gap-2">
              <button
                onClick={handlePrevPage}
                disabled={cursor === null}
                className="btn-secondary px-4 py-2 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} />
                Previous
              </button>
              <button
                onClick={handleNextPage}
                disabled={!hasMore || loading}
                className="btn-secondary px-4 py-2 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="card max-w-md w-full">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-vault-text">
                {showDeleteConfirm === 'single' && 'Delete Request?'}
                {showDeleteConfirm === 'failed' && 'Delete All Failed Requests?'}
                {showDeleteConfirm === 'all' && 'Delete All Requests?'}
              </h3>
              <p className="text-sm text-vault-text-secondary mt-2">
                {showDeleteConfirm === 'single' && 'This request will be permanently deleted. This action cannot be undone.'}
                {showDeleteConfirm === 'failed' && 'All requests with status 4xx or 5xx will be permanently deleted. This action cannot be undone.'}
                {showDeleteConfirm === 'all' && 'All requests will be permanently deleted. This action cannot be undone.'}
              </p>
            </div>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="btn-secondary px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (showDeleteConfirm === 'single' && deletingId) {
                    handleDeleteRequest(deletingId)
                  } else if (showDeleteConfirm === 'failed') {
                    handleDeleteFailed()
                  } else if (showDeleteConfirm === 'all') {
                    handleDeleteAll()
                  }
                }}
                className="btn-primary px-4 py-2 bg-vault-danger hover:bg-vault-danger/80 disabled:opacity-50"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
