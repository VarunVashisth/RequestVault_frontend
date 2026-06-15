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
      id: 'overview',
      title: 'Overview',
    },
    {
      id: 'why-requestvault',
      title: 'Why RequestVault Exists',
    },
    {
      id: 'core-capabilities',
      title: 'Core Capabilities',
    },
    {
      id: 'getting-started',
      title: 'Getting Started',
    },
    {
      id: 'how-it-works',
      title: 'How It Works',
    },
    {
      id: 'sdk-configuration',
      title: 'SDK Configuration',
    },
    {
      id: 'dashboard-analytics',
      title: 'Dashboard Analytics',
    },
    {
      id: 'security-and-privacy',
      title: 'Security and Privacy',
    },
    {
      id: 'production-recommendations',
      title: 'Production Recommendations',
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
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
              {/* Overview */}
              <section id="overview" className="scroll-mt-20">
                <h2 className="text-3xl font-bold text-vault-text mb-6">Overview</h2>
                <div className="space-y-6 text-vault-text-secondary">
                  <p>
                    Modern applications are deeply interconnected through APIs. Every payment gateway, authentication provider, 
                    AI service, analytics platform, notification system, and internal microservice adds another layer of network 
                    dependency that can introduce failures, unexpected behavior, or performance bottlenecks.
                  </p>
                  <p>
                    When issues arise, developers are frequently left troubleshooting across scattered logs, exception traces, 
                    monitoring dashboards, and multiple third-party interfaces   a fragmented and time-consuming process.
                  </p>
                  <p>
                    RequestVault was built to change that. It gives you a single, powerful observability platform dedicated to 
                    your outbound API traffic. By integrating our lightweight SDK, you instantly gain comprehensive visibility 
                    into every request your application makes   including detailed request/response data, performance metrics, 
                    failure patterns, and usage trends   all without changing your existing business logic.
                  </p>
                  <p>
                    The goal is clear and powerful: help you truly understand what your application is sending to external services, 
                    how those services are responding, and exactly where problems are originating.
                  </p>
                  <p>
                    Whether you're debugging a critical production incident, validating a new third-party integration, investigating 
                    mysterious latency spikes, or simply gaining deeper insight into your application's external communication patterns, 
                    RequestVault delivers the rich context and clarity you need.
                  </p>
                </div>
              </section>

              {/* Why RequestVault Exists */}
              <section id="why-requestvault" className="scroll-mt-20">
                <h2 className="text-3xl font-bold text-vault-text mb-6">Why RequestVault Exists</h2>
                <div className="space-y-6 text-vault-text-secondary">
                  <p>
                    While observability tools have traditionally focused on infrastructure, servers, and internal application metrics, 
                    outbound API traffic   one of the most common sources of production issues   has often been overlooked.
                  </p>
                  <p>A single problematic external dependency can trigger a cascade of issues including:</p>
                  <ul className="list-disc list-inside space-y-2 ml-2">
                    <li>Authentication and authorization failures</li>
                    <li>Payment processing disruptions</li>
                    <li>AI service unavailability</li>
                    <li>Unexpected latency increases</li>
                    <li>Cascading application errors</li>
                    <li>Degraded customer experiences</li>
                  </ul>
                  <p>
                    Many teams only discover these problems after users start complaining. RequestVault was specifically designed 
                    to shine a light on the external communication layer. By intelligently capturing outbound HTTP traffic, it makes 
                    every interaction visible, searchable, analyzable, and actionable.
                  </p>
                </div>
              </section>

              {/* Core Capabilities */}
              <section id="core-capabilities" className="scroll-mt-20">
                <h2 className="text-3xl font-bold text-vault-text mb-6">Core Capabilities</h2>
                <div className="space-y-8">
                  {/* Request Inspection */}
                  <div className="bg-vault-surface border border-vault-border rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-vault-text mb-4">Request Inspection</h3>
                    <p className="text-vault-text-secondary mb-4">
                      Every captured request can be examined in rich detail. You can explore:
                    </p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-vault-text-secondary list-disc list-inside">
                      <li>HTTP method and endpoint URL</li>
                      <li>Response status code</li>
                      <li>Full response time (latency)</li>
                      <li>Complete request and response headers</li>
                      <li>Request and response payloads</li>
                      <li>User-Agent and client information</li>
                      <li>Precise timestamp data</li>
                    </ul>
                    <p className="text-vault-text-secondary mt-4">
                      This level of detail allows you to accurately reconstruct exactly what happened during any API interaction.
                    </p>
                  </div>

                  {/* Traffic Analytics */}
                  <div className="bg-vault-surface border border-vault-border rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-vault-text mb-4">Traffic Analytics</h3>
                    <p className="text-vault-text-secondary mb-4">
                      Raw request data becomes far more powerful when intelligently aggregated and visualized. RequestVault 
                      continuously processes your traffic to surface meaningful insights such as:
                    </p>
                    <ul className="space-y-2 text-sm text-vault-text-secondary list-disc list-inside">
                      <li>Request volume trends over time</li>
                      <li>Success vs failure rates</li>
                      <li>Most frequently called endpoints</li>
                      <li>Response latency patterns and trends</li>
                      <li>Slowest performing integrations</li>
                      <li>Error-prone services and endpoints</li>
                      <li>Real-time recent request activity</li>
                    </ul>
                  </div>

                  {/* Failure Visibility */}
                  <div className="bg-vault-surface border border-vault-border rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-vault-text mb-4">Failure Visibility</h3>
                    <p className="text-vault-text-secondary">
                      Not every failure produces a clean HTTP response. Network timeouts, DNS resolution failures, 
                      connection errors, and other low-level issues often vanish into application logs. RequestVault 
                      captures these challenging scenarios alongside successful requests, giving you complete visibility.
                    </p>
                    <div className="mt-4 bg-vault-bg border border-vault-border rounded-lg p-4">
                      <p className="text-sm text-vault-text-secondary mb-2">Failed requests are stored with clear indicators such as:</p>
                      <pre className="text-vault-accent font-mono text-sm overflow-x-auto">{`{
  "status_code": 0
}`}</pre>
                    </div>
                  </div>
                </div>
              </section>

              {/* Getting Started */}
              <section id="getting-started" className="scroll-mt-20">
                <h2 className="text-3xl font-bold text-vault-text mb-6">Getting Started</h2>
                <div className="space-y-8 text-vault-text-secondary">
                  <div>
                    <h3 className="text-lg font-semibold text-vault-text mb-3">Create an Account</h3>
                    <p>
                      Sign up for a RequestVault account. Once your account is ready, a dedicated workspace will be 
                      automatically provisioned for you.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-vault-text mb-3">Retrieve Your API Key</h3>
                    <p>
                      Each workspace comes with a unique API key. This key securely identifies your application and 
                      authorizes telemetry data to be sent to RequestVault. Keep it confidential and secure.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-vault-text mb-3">Install the SDK</h3>
                    <div className="bg-vault-surface border border-vault-border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <code className="text-vault-accent font-mono">pip install requestvault</code>
                        <button
                          onClick={() => copyToClipboard('pip install requestvault', 'install')}
                          className="text-vault-text-secondary hover:text-vault-text transition-colors"
                        >
                          {copied === 'install' ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-vault-text mb-3">Initialize RequestVault</h3>
                    <div className="bg-vault-bg rounded-lg p-4 font-mono text-sm text-vault-accent overflow-x-auto">
                      <pre>{`from requestvault import RequestVault

RequestVault.init(
    api_key="YOUR_API_KEY"
)`}</pre>
                    </div>
                    <p className="mt-3 text-sm text-vault-text-secondary">
                      Once initialized, RequestVault automatically begins monitoring supported HTTP traffic in the background.
                    </p>
                  </div>
                </div>
              </section>

              {/* How It Works */}
              <section id="how-it-works" className="scroll-mt-20">
                <h2 className="text-3xl font-bold text-vault-text mb-6">How It Works</h2>
                <div className="space-y-6 text-vault-text-secondary">
                  <p>
                    RequestVault integrates seamlessly with the Python <code className="text-vault-accent">requests</code> ecosystem. 
                    The SDK works by instrumenting <code className="text-vault-accent">requests.Session.request</code> internally.
                  </p>
                  <p>
                    When your application makes a request, RequestVault automatically:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 ml-2">
                    <li>Captures comprehensive request metadata</li>
                    <li>Precisely measures request duration and performance</li>
                    <li>Records detailed response information</li>
                    <li>Queues the telemetry data safely</li>
                    <li>Sends data asynchronously through a background worker</li>
                  </ol>
                  <p>
                    Because all transmission happens asynchronously in a separate process, your application's core performance 
                    and execution flow remain completely unaffected. Monitoring should enhance visibility   never interfere with it.
                  </p>

                  <div>
                    <h3 className="text-lg font-semibold text-vault-text mb-3">Automatic Data Collection</h3>
                    <div className="bg-vault-surface border border-vault-border rounded-xl p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                        <div><span className="font-medium text-vault-text">Request Information:</span> Method, endpoint, headers, payload</div>
                        <div><span className="font-medium text-vault-text">Response Information:</span> Status code, headers, payload</div>
                        <div><span className="font-medium text-vault-text">Performance Metrics:</span> Full response time</div>
                        <div><span className="font-medium text-vault-text">Environment Data:</span> User-Agent and client details</div>
                        <div><span className="font-medium text-vault-text">Failure Information:</span> Timeouts, connection issues, DNS errors</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm mb-3">Example request that will automatically appear in your dashboard:</p>
                    <div className="bg-vault-bg rounded-lg p-4 font-mono text-sm text-vault-accent overflow-x-auto">
                      <pre>{`import requests

response = requests.get(
    "https://api.github.com/users/octocat"
)`}</pre>
                    </div>
                  </div>
                </div>
              </section>

              {/* SDK Configuration */}
              <section id="sdk-configuration" className="scroll-mt-20">
                <h2 className="text-3xl font-bold text-vault-text mb-6">SDK Configuration</h2>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold text-vault-text mb-3">API Key (Required)</h3>
                    <div className="bg-vault-bg rounded-lg p-4 font-mono text-sm text-vault-accent overflow-x-auto">
                      <pre>{`RequestVault.init(
    api_key="rv_xxxxxxxxxxxxxxxxx"
)`}</pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-vault-text mb-3">Server URL (Optional)</h3>
                    <p className="text-vault-text-secondary mb-3">
                      By default, RequestVault sends telemetry to our hosted service. However, you can easily point the SDK 
                      to your own self-hosted server by configuring the <code className="text-vault-accent">server_url</code> option. 
                      This gives you complete control over where your data is stored and processed.
                    </p>
                    <div className="bg-vault-bg rounded-lg p-4 font-mono text-sm text-vault-accent overflow-x-auto">
                      <pre>{`RequestVault.init(
    api_key="YOUR_API_KEY",
    server_url="https://your-server.com/capture"
)`}</pre>
                    </div>
                    <p className="text-vault-text-secondary mt-3 text-sm">
                      The <code className="text-vault-accent">server_url</code> should point to your custom endpoint that accepts 
                      the telemetry payload (typically <code>/capture</code>). You can fully customize this to match your infrastructure, 
                      security requirements, or compliance needs. This flexibility makes RequestVault suitable for both cloud-hosted 
                      and on-premise/self-hosted environments.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-vault-text mb-3">URL Inclusion Filtering</h3>
                    <div className="bg-vault-bg rounded-lg p-4 font-mono text-sm text-vault-accent overflow-x-auto">
                      <pre>{`RequestVault.init(
    api_key="YOUR_API_KEY",
    include_urls=[
        "api.stripe.com",
        "api.github.com"
    ]
)`}</pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-vault-text mb-3">URL Exclusion Filtering</h3>
                    <div className="bg-vault-bg rounded-lg p-4 font-mono text-sm text-vault-accent overflow-x-auto">
                      <pre>{`RequestVault.init(
    api_key="YOUR_API_KEY",
    exclude_urls=[
        "localhost",
        "127.0.0.1"
    ]
)`}</pre>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-vault-text mb-2">Header Collection</h4>
                      <div className="bg-vault-bg rounded-lg p-4 font-mono text-sm text-vault-accent overflow-x-auto">
                        <pre>{`capture_headers=False`}</pre>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-vault-text mb-2">Request Body Collection</h4>
                      <div className="bg-vault-bg rounded-lg p-4 font-mono text-sm text-vault-accent overflow-x-auto">
                        <pre>{`capture_request_body=False`}</pre>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-vault-text mb-2">Response Body Collection</h4>
                      <div className="bg-vault-bg rounded-lg p-4 font-mono text-sm text-vault-accent overflow-x-auto">
                        <pre>{`capture_response_body=False`}</pre>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-vault-text mb-2">Maximum Payload Size</h4>
                      <div className="bg-vault-bg rounded-lg p-4 font-mono text-sm text-vault-accent overflow-x-auto">
                        <pre>{`max_body_size=10000`}</pre>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Dashboard Analytics */}
              <section id="dashboard-analytics" className="scroll-mt-20">
                <h2 className="text-3xl font-bold text-vault-text mb-6">Dashboard Analytics</h2>
                <div className="text-vault-text-secondary space-y-4">
                  <p>The RequestVault dashboard turns your raw request telemetry into clear, actionable operational insights.</p>
                  <ul className="list-disc list-inside space-y-3 ml-2">
                    <li><span className="font-medium text-vault-text">Request Volume:</span> Beautiful visualizations of request activity over time</li>
                    <li><span className="font-medium text-vault-text">Response Time Trends:</span> Track average and percentile latency with performance degradation alerts</li>
                    <li><span className="font-medium text-vault-text">Status Distribution:</span> Monitor success rates across 2xx, 3xx, 4xx, 5xx, and failed requests</li>
                    <li><span className="font-medium text-vault-text">Top Endpoints:</span> Identify which integrations drive the majority of your traffic</li>
                    <li><span className="font-medium text-vault-text">Slow Endpoints:</span> Surface the services contributing most to latency</li>
                    <li><span className="font-medium text-vault-text">Recent Activity:</span> Live feed of the latest captured requests as they happen</li>
                  </ul>
                </div>
              </section>

              {/* Security and Privacy */}
              <section id="security-and-privacy" className="scroll-mt-20">
                <h2 className="text-3xl font-bold text-vault-text mb-6">Security and Privacy</h2>
                <div className="space-y-6 text-vault-text-secondary">
                  <p>
                    Security is a core foundation of RequestVault. Sensitive data is automatically redacted before storage, 
                    including passwords, access tokens,  API keys, authorization headers.
                  </p>
                  <p>
                    Payloads are intelligently truncated based on configurable limits. Additionally, powerful URL filtering 
                    options let you exclude sensitive endpoints entirely from capture.
                  </p>
                </div>
              </section>

              {/* Production Recommendations */}
              <section id="production-recommendations" className="scroll-mt-20">
                <h2 className="text-3xl font-bold text-vault-text mb-6">Production Recommendations</h2>
                <div className="bg-vault-surface border border-vault-border rounded-xl p-6">
                  <div className="bg-vault-bg rounded-lg p-4 font-mono text-sm text-vault-accent overflow-x-auto mb-6">
                    <pre>{`RequestVault.init(
    api_key="PRODUCTION_API_KEY",
    capture_headers=True,
    capture_request_body=False,
    capture_response_body=False,
    max_body_size=5000
)`}</pre>
                  </div>
                  <ul className="space-y-2 text-vault-text-secondary list-disc list-inside ml-2">
                    <li>Use a dedicated production API key</li>
                    <li>Exclude internal health check and monitoring endpoints</li>
                    <li>Limit payload collection in high-traffic environments</li>
                    <li>Only monitor the traffic that provides meaningful operational visibility</li>
                  </ul>
                </div>
              </section>

              {/* Troubleshooting */}
              <section id="troubleshooting" className="scroll-mt-20">
                <h2 className="text-3xl font-bold text-vault-text mb-6">Troubleshooting</h2>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold text-vault-text mb-3">Requests Are Not Appearing</h3>
                    <ul className="list-disc list-inside space-y-2 text-vault-text-secondary ml-2">
                      <li>Confirm that SDK initialization was called successfully</li>
                      <li>Verify your API key is correct and active</li>
                      <li>Check network connectivity to the configured server</li>
                      <li>Ensure URL filters are not unintentionally excluding your traffic</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-vault-text mb-3">Failed Requests Not Appearing</h3>
                    <p className="text-vault-text-secondary">
                      Make sure requests are made through the standard <code className="text-vault-accent">requests</code> library 
                      and not through unsupported HTTP clients or custom transport layers.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-vault-text mb-3">Missing Request Bodies</h3>
                    <p className="text-vault-text-secondary">
                      Verify that payload collection is enabled (enabled by default):
                    </p>
                    <div className="bg-vault-bg rounded-lg p-4 font-mono text-sm text-vault-accent overflow-x-auto mt-3">
                      <pre>{`capture_request_body=True
capture_response_body=True`}</pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-vault-text mb-3">Delayed Updates</h3>
                    <p className="text-vault-text-secondary">
                      RequestVault sends telemetry asynchronously to avoid impacting application performance. 
                      Small delays in dashboard updates are normal and expected.
                    </p>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}