import { useState } from 'react'
import PublicLayout from '@/components/layout/PublicLayout'
import { Copy, Check } from 'lucide-react'

export default function DocumentationPage() {
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const sections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
    },
    {
      id: 'authentication',
      title: 'Authentication',
    },
    {
      id: 'installation',
      title: 'Installation',
    },
    {
      id: 'sdk-usage',
      title: 'SDK Usage',
    },
    {
      id: 'api-examples',
      title: 'API Examples',
    },
  ]

  return (
    <PublicLayout>
      <div className="min-h-screen pt-20 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-2">
              <div className="sticky top-24">
                <h3 className="text-sm font-semibold text-vault-text mb-4">Documentation</h3>
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block px-4 py-2 rounded-lg text-sm text-vault-text-secondary hover:text-vault-text hover:bg-vault-border/30 transition-colors"
                  >
                    {section.title}
                  </a>
                ))}
              </div>
            </aside>

            {/* Main content */}
            <main className="lg:col-span-3 space-y-16">
              {/* Getting Started */}
              <section id="getting-started" className="scroll-mt-20">
                <h2 className="text-3xl font-bold text-vault-text mb-6">Getting Started</h2>
                <div className="space-y-4 text-vault-text-secondary">
                  <p>
                    RequestVault is an API monitoring platform that gives you complete visibility into your API requests. This documentation will help you get up and running in minutes.
                  </p>
                  <p>
                    To get started, you'll need to:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 ml-2">
                    <li>Create a RequestVault account</li>
                    <li>Generate your first API key</li>
                    <li>Integrate the SDK into your application</li>
                    <li>Start monitoring requests</li>
                  </ol>
                </div>
              </section>

              {/* Authentication */}
              <section id="authentication" className="scroll-mt-20">
                <h2 className="text-3xl font-bold text-vault-text mb-6">Authentication</h2>
                <div className="space-y-6">
                  <div className="space-y-3">
                    <p className="text-vault-text-secondary">
                      All API requests require authentication using an API key. Include your API key in the Authorization header:
                    </p>
                    <div className="bg-vault-surface border border-vault-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <code className="text-vault-accent text-sm font-mono">Authorization: Bearer YOUR_API_KEY</code>
                        <button
                          onClick={() => copyToClipboard('Authorization: Bearer YOUR_API_KEY', 'auth')}
                          className="text-vault-text-secondary hover:text-vault-text transition-colors"
                        >
                          {copied === 'auth' ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-vault-text">API Key Management</h3>
                    <p className="text-vault-text-secondary">
                      You can manage your API keys in the dashboard. Each key can be rotated or deleted independently.
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-vault-text-secondary ml-2">
                      <li>API keys grant full access to your account data</li>
                      <li>Keep your keys secure and never commit them to version control</li>
                      <li>Rotate keys regularly for enhanced security</li>
                      <li>Use different keys for different environments</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Installation */}
              <section id="installation" className="scroll-mt-20">
                <h2 className="text-3xl font-bold text-vault-text mb-6">Installation</h2>
                <div className="space-y-6">
                  {/* NPM */}
                  <div>
                    <h3 className="text-lg font-semibold text-vault-text mb-4">NPM / JavaScript</h3>
                    <div className="bg-vault-surface border border-vault-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <code className="text-vault-accent text-sm font-mono">npm install @requestvault/sdk</code>
                        <button
                          onClick={() => copyToClipboard('npm install @requestvault/sdk', 'npm')}
                          className="text-vault-text-secondary hover:text-vault-text transition-colors"
                        >
                          {copied === 'npm' ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Python */}
                  <div>
                    <h3 className="text-lg font-semibold text-vault-text mb-4">Python</h3>
                    <div className="bg-vault-surface border border-vault-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <code className="text-vault-accent text-sm font-mono">pip install requestvault</code>
                        <button
                          onClick={() => copyToClipboard('pip install requestvault', 'python')}
                          className="text-vault-text-secondary hover:text-vault-text transition-colors"
                        >
                          {copied === 'python' ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Go */}
                  <div>
                    <h3 className="text-lg font-semibold text-vault-text mb-4">Go</h3>
                    <div className="bg-vault-surface border border-vault-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <code className="text-vault-accent text-sm font-mono">go get github.com/requestvault/go-sdk</code>
                        <button
                          onClick={() => copyToClipboard('go get github.com/requestvault/go-sdk', 'go')}
                          className="text-vault-text-secondary hover:text-vault-text transition-colors"
                        >
                          {copied === 'go' ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* SDK Usage */}
              <section id="sdk-usage" className="scroll-mt-20">
                <h2 className="text-3xl font-bold text-vault-text mb-6">SDK Usage</h2>
                <div className="space-y-6">
                  {/* JavaScript */}
                  <div>
                    <h3 className="text-lg font-semibold text-vault-text mb-4">JavaScript/Node.js</h3>
                    <div className="bg-vault-bg rounded-lg p-4 font-mono text-sm text-vault-accent overflow-x-auto">
                      <pre>{`import { RequestVault } from '@requestvault/sdk';

const vault = new RequestVault({
  apiKey: 'your_api_key_here'
});

// Track a request
vault.trackRequest({
  method: 'GET',
  endpoint: '/api/users',
  statusCode: 200,
  responseTime: 125,
  timestamp: new Date()
});`}</pre>
                    </div>
                  </div>

                  {/* Python */}
                  <div>
                    <h3 className="text-lg font-semibold text-vault-text mb-4">Python</h3>
                    <div className="bg-vault-bg rounded-lg p-4 font-mono text-sm text-vault-accent overflow-x-auto">
                      <pre>{`from requestvault import RequestVault

vault = RequestVault(api_key='your_api_key_here')

# Track a request
vault.track_request({
    'method': 'GET',
    'endpoint': '/api/users',
    'status_code': 200,
    'response_time': 125,
    'timestamp': datetime.now()
})`}</pre>
                    </div>
                  </div>

                  {/* Go */}
                  <div>
                    <h3 className="text-lg font-semibold text-vault-text mb-4">Go</h3>
                    <div className="bg-vault-bg rounded-lg p-4 font-mono text-sm text-vault-accent overflow-x-auto">
                      <pre>{`package main

import "github.com/requestvault/go-sdk"

func main() {
    vault := sdk.NewRequestVault("your_api_key_here")
    
    vault.TrackRequest(&sdk.Request{
        Method: "GET",
        Endpoint: "/api/users",
        StatusCode: 200,
        ResponseTime: 125,
    })
}`}</pre>
                    </div>
                  </div>
                </div>
              </section>

              {/* API Examples */}
              <section id="api-examples" className="scroll-mt-20">
                <h2 className="text-3xl font-bold text-vault-text mb-6">API Examples</h2>
                <div className="space-y-6">
                  {/* Get requests */}
                  <div>
                    <h3 className="text-lg font-semibold text-vault-text mb-4">Get All Requests</h3>
                    <div className="bg-vault-bg rounded-lg p-4 font-mono text-sm text-vault-accent overflow-x-auto mb-4">
                      <pre>{`curl -H "Authorization: Bearer YOUR_API_KEY" \\
  https://api.requestvault.io/api/requests?limit=20`}</pre>
                    </div>
                  </div>

                  {/* Get single request */}
                  <div>
                    <h3 className="text-lg font-semibold text-vault-text mb-4">Get Single Request</h3>
                    <div className="bg-vault-bg rounded-lg p-4 font-mono text-sm text-vault-accent overflow-x-auto mb-4">
                      <pre>{`curl -H "Authorization: Bearer YOUR_API_KEY" \\
  https://api.requestvault.io/api/requests/req_123`}</pre>
                    </div>
                  </div>

                  {/* Get analytics */}
                  <div>
                    <h3 className="text-lg font-semibold text-vault-text mb-4">Get Analytics</h3>
                    <div className="bg-vault-bg rounded-lg p-4 font-mono text-sm text-vault-accent overflow-x-auto mb-4">
                      <pre>{`curl -H "Authorization: Bearer YOUR_API_KEY" \\
  https://api.requestvault.io/api/analytics/dashboard?period=day`}</pre>
                    </div>
                  </div>
                </div>
              </section>

              {/* Support */}
              <section className="border-t border-vault-border pt-12">
                <h2 className="text-2xl font-bold text-vault-text mb-4">Need Help?</h2>
                <p className="text-vault-text-secondary mb-4">
                  If you have questions or need assistance, reach out to our support team:
                </p>
                <ul className="space-y-2 text-vault-accent">
                  <li>
                    <a href="mailto:support@requestvault.io" className="hover:text-vault-accent-hover transition-colors">
                      support@requestvault.io
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/requestvault" className="hover:text-vault-accent-hover transition-colors">
                      GitHub Community
                    </a>
                  </li>
                </ul>
              </section>
            </main>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
