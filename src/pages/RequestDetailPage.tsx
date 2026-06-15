import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { requestsService } from '@/services/requestsService'
import { Request } from '@/store/dashboardStore'
import StatusBadge from '@/components/ui/StatusBadge'
import MethodBadge from '@/components/ui/MethodBadge'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import EmptyState from '@/components/ui/EmptyState'
import { ArrowLeft, Copy, Check, FileText, Trash2 } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

export default function RequestDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [request, setRequest] = useState<Request | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const loadRequest = async () => {
      if (!id) {
        setLoading(false)
        return
      }

      try {
        // Use dedicated endpoint to load single request by ID
        const data = await requestsService.getRequest(id)
        setRequest(data)
      } catch (err) {
        console.error('Failed to load request:', err)
      } finally {
        setLoading(false)
      }
    }

    loadRequest()
  }, [id])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDelete = async () => {
    if (!id) return
    setDeleting(true)
    try {
      await requestsService.deleteRequest(id)
      navigate('/requests')
    } catch (err) {
      console.error('Failed to delete request:', err)
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    )
  }

  if (!request) {
    return (
      <div className="p-6 lg:p-8 space-y-6 max-w-3xl">
        <button
          onClick={() => navigate('/requests')}
          className="flex items-center gap-2 text-vault-accent hover:text-vault-accent-hover transition-colors text-sm font-medium"
        >
          <ArrowLeft size={16} />
          Back to Requests
        </button>
        <EmptyState
          icon={FileText}
          title="Request not found"
          description="The request you're looking for doesn't exist or has been deleted"
          action={{ label: 'Back to Requests', onClick: () => navigate('/requests') }}
        />
      </div>
    )
  }

  const renderJSON = (data: any) => {
    try {
      if (typeof data === 'string') {
        return data
      }
      return JSON.stringify(data, null, 2)
    } catch {
      return String(data)
    }
  }

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-3xl">
      {/* Back button */}
      <button
        onClick={() => navigate('/requests')}
        className="flex items-center gap-2 text-vault-accent hover:text-vault-accent-hover transition-colors text-sm font-medium"
      >
        <ArrowLeft size={16} />
        Back to Requests
      </button>

      {/* Header */}
      <div className="card">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <StatusBadge status={request.status_code} />
              <MethodBadge method={request.method} />
            </div>
            <p className="text-vault-text font-mono text-sm mb-3 break-all">{request.endpoint}</p>
            <p className="text-vault-text-secondary text-xs">
              {formatDistanceToNow(new Date(request.created_at), { addSuffix: true })}
            </p>
          </div>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="btn-secondary px-4 py-2 text-sm flex items-center gap-2 text-vault-danger hover:text-vault-danger flex-shrink-0"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>

        {/* Request metadata */}
        <div className="grid grid-cols-2 gap-4 border-t border-vault-border pt-6">
          <div>
            <p className="text-vault-text-secondary text-xs font-medium mb-1">Status Code</p>
            <p className="text-lg font-semibold text-vault-text">{request.status_code}</p>
          </div>
          <div>
            <p className="text-vault-text-secondary text-xs font-medium mb-1">Response Time</p>
            <p className="text-lg font-semibold text-vault-text">{request.response_time}ms</p>
          </div>
          <div>
            <p className="text-vault-text-secondary text-xs font-medium mb-1">IP Address</p>
            <p className="text-sm font-mono text-vault-text">{request.ip_address || 'N/A'}</p>
          </div>
          <div>
            <p className="text-vault-text-secondary text-xs font-medium mb-1">User Agent</p>
            <p className="text-xs text-vault-text break-words">{request.useragent || 'N/A'}</p>
          </div>
          <div className="col-span-2">
            <p className="text-vault-text-secondary text-xs font-medium mb-1">Timestamp</p>
            <p className="text-sm text-vault-text">{new Date(request.created_at).toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Request Headers */}
      {request.request_headers && Object.keys(request.request_headers).length > 0 && (
        <div className="card">
          <h2 className="text-base font-semibold text-vault-text mb-4">Request Headers</h2>
          <div className="bg-vault-bg rounded p-4 overflow-x-auto border border-vault-border">
            <pre className="font-mono text-xs text-vault-text whitespace-pre-wrap break-words">
              {renderJSON(request.request_headers)}
            </pre>
          </div>
        </div>
      )}
      
      {/* Response Headers */}
      {request.response_headers && Object.keys(request.response_headers).length > 0 && (
        <div className="card">
          <h2 className="text-base font-semibold text-vault-text mb-4">Response Headers</h2>
          <div className="bg-vault-bg rounded p-4 overflow-x-auto border border-vault-border">
            <pre className="font-mono text-xs text-vault-text whitespace-pre-wrap break-words">
              {renderJSON(request.response_headers)}
            </pre>
          </div>
        </div>
      )}
      
      {/* Request Body */}
      {request.request_body && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-vault-text">Request Body</h2>
            <button
              onClick={() => copyToClipboard(renderJSON(request.request_body))}
              className="flex items-center gap-2 text-xs font-medium text-vault-accent hover:text-vault-accent-hover transition-colors"
            >
              {copied ? (
                <>
                  <Check size={16} />
                  Copied
                </>
              ) : (
                <>
                  <Copy size={16} />
                  Copy
                </>
              )}
            </button>
          </div>
          <div className="bg-vault-bg rounded p-4 overflow-x-auto border border-vault-border">
            <pre className="font-mono text-xs text-vault-text whitespace-pre-wrap break-words">
              {renderJSON(request.request_body)}
            </pre>
          </div>
        </div>
      )}
      
      {/* Response Body */}
      {request.response_body && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-vault-text">Response Body</h2>
            <button
              onClick={() => copyToClipboard(renderJSON(request.response_body))}
              className="flex items-center gap-2 text-xs font-medium text-vault-accent hover:text-vault-accent-hover transition-colors"
            >
              {copied ? (
                <>
                  <Check size={16} />
                  Copied
                </>
              ) : (
                <>
                  <Copy size={16} />
                  Copy
                </>
              )}
            </button>
          </div>
          <div className="bg-vault-bg rounded p-4 overflow-x-auto border border-vault-border">
            <pre className="font-mono text-xs text-vault-text whitespace-pre-wrap break-words">
              {renderJSON(request.response_body)}
            </pre>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="card max-w-md w-full">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-vault-text">Delete Request?</h3>
              <p className="text-sm text-vault-text-secondary mt-2">
                This request will be permanently deleted. This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={deleting}
                className="btn-secondary px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="btn-primary px-4 py-2 bg-vault-danger hover:bg-vault-danger/80 disabled:opacity-50"
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
