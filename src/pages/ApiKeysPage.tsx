import { useState, useEffect } from 'react'
import { Copy, Check, Eye, EyeOff , Key } from 'lucide-react'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import EmptyState from '@/components/ui/EmptyState'
import { apiKeysService } from '@/services/apiKeysService'

interface ApiKeyResponse {
  api_key: string
  created_at: string
}

export default function ApiKeysPage() {
  const [apiKey, setApiKey] = useState<ApiKeyResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [showKey, setShowKey] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const fetchKey = async () => {
      try {
        setLoading(true)
        const data = await apiKeysService.getApiKey()
        setApiKey(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchKey()
  }, [])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  const handleRegenerate = async () => {
    try {
      setLoading(true)

      const data = await apiKeysService.regenerateApiKey()
      console.log("REGNERATE_RESPONSE", data)
      setApiKey(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-vault-text">
          API Key
        </h1>

        <p className="text-vault-text-secondary mt-1 text-sm">
          Manage your RequestVault API key
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner />
        </div>
      ) : !apiKey ? (
        <EmptyState
          icon={Key}
          title="No API Key Found"
          description="Unable to load API key"
        />
      ) : (
        <>
          <div className="card space-y-6">
            <div>
              <h3 className="text-base font-semibold text-vault-text mb-4">
                RequestVault API Key
              </h3>

              <div className="flex items-center gap-2 bg-vault-bg rounded p-3">
                <code className="text-xs text-vault-accent font-mono flex-1 truncate">
                  {showKey
                    ? apiKey.api_key
                    : apiKey.api_key.substring(0, 8) + '•••••••••••••••••'}
                </code>

                <button
                  onClick={() => setShowKey(!showKey)}
                  className="p-1.5 text-vault-text-secondary hover:text-vault-text hover:bg-vault-border/50 rounded transition-colors flex-shrink-0"
                >
                  {showKey ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

                <button
                  onClick={() => copyToClipboard(apiKey.api_key)}
                  className="p-1.5 text-vault-text-secondary hover:text-vault-text hover:bg-vault-border/50 rounded transition-colors flex-shrink-0"
                >
                  {copied ? (
                    <Check size={18} className="text-vault-success" />
                  ) : (
                    <Copy size={18} />
                  )}
                </button>
              </div>
            </div>

            <div className="border-t border-vault-border pt-6">
              <p className="text-xs text-vault-text-secondary mb-4">
                Created {new Date(apiKey.created_at).toLocaleDateString()}
              </p>

              <button
                onClick={handleRegenerate}
                className="btn-primary px-4 py-2 text-sm font-medium"
              >
                Regenerate API Key
              </button>
            </div>
          </div>

          <div className="card bg-vault-accent/5 border-vault-accent/20">
            <h3 className="text-base font-semibold text-vault-text mb-4">
              How to use your API key
            </h3>

            <div className="space-y-4">
              <p className="text-vault-text-secondary text-sm">
                Include your API key when sending requests to RequestVault.
              </p>

              <div className="bg-vault-bg rounded p-4 font-mono text-xs text-vault-accent overflow-x-auto border border-vault-border">
                curl -X POST http://localhost:8000/capture \
                {'\n'}
                -H "Content-Type: application/json" \
                {'\n'}
                -d '{`{"api_key":"YOUR_API_KEY"}`}'
              </div>

              <p className="text-vault-text-secondary text-xs font-semibold">
                Never share your API key publicly.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}