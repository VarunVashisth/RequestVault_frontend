import { useNavigate } from 'react-router-dom'
import PublicLayout from '@/components/layout/PublicLayout'
import { ArrowRight, Activity, BarChart3, Lock, Code2 } from 'lucide-react'

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative pt-16 pb-20 px-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-vault-accent/10 border border-vault-accent/30">
            <span className="text-xs font-semibold text-vault-accent">v0.1.0</span>
            <span className="text-xs text-vault-text-secondary">Now in open beta</span>
          </div>

          <h1 className="text-6xl lg:text-7xl font-bold text-vault-text mb-6 leading-tight tracking-tight">
            Complete visibility into your API
          </h1>

          <p className="text-xl text-vault-text-secondary mb-10 leading-relaxed max-w-3xl">
            Monitor API requests, track performance metrics, debug issues in real-time, and maintain full control over your infrastructure—all from one clean, developer-focused dashboard.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <button
              onClick={() => navigate('/register')}
              className="btn-primary px-6 py-3 font-semibold flex items-center justify-center gap-2"
            >
              Get Started Free
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => navigate('/docs')}
              className="btn-secondary px-6 py-3 font-semibold"
            >
              View Documentation
            </button>
          </div>

          {/* Dashboard preview placeholder */}
          <div className="bg-vault-surface border border-vault-border rounded-lg overflow-hidden shadow-xl">
            <div className="h-120 bg-gradient-to-b from-vault-border/20 to-vault-border/5 flex items-center justify-center">
              <div className="text-center">
                
                <img src="src/public/dashboard.png" />

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Vertical Stack */}
      <section id="features" className="py-24 px-8 border-t border-vault-border/50">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-vault-text mb-4">Powerful features for developers</h2>
            <p className="text-lg text-vault-text-secondary">Everything you need to monitor, debug, and understand your API traffic at scale.</p>
          </div>

          <div className="space-y-12">
            {/* Feature 1 */}
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Activity size={28} className="text-vault-accent" />
                  <h3 className="text-2xl font-bold text-vault-text">Real-time Monitoring</h3>
                </div>
                <p className="text-vault-text-secondary leading-relaxed mb-4">
                  Instantly capture and analyze every API request flowing through your infrastructure. See request patterns, performance metrics, and errors as they happen with zero latency impact.
                </p>
                <ul className="space-y-2 text-sm text-vault-text-secondary">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-vault-accent" />
                    Live request streaming
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-vault-accent" />
                    Sub-millisecond latency tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-vault-accent" />
                    Full request/response inspection
                  </li>
                </ul>
              </div>
              <div className="bg-vault-surface border border-vault-border rounded-lg p-8 h-80  flex items-center justify-center">
                <div className="text-center">

                  <img src = "src/public/feature1.png"/>

                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className="bg-vault-surface border border-vault-border rounded-lg p-8 h-80 flex items-center justify-center order-2 md:order-1">
                <div className="text-center">
                  <img src = "src/public/feature2.png"/>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="flex items-center gap-3 mb-4">
                  <BarChart3 size={28} className="text-vault-accent" />
                  <h3 className="text-2xl font-bold text-vault-text">Actionable Analytics</h3>
                </div>
                <p className="text-vault-text-secondary leading-relaxed mb-4">
                  Transform raw request data into meaningful insights. Track success rates, response times, error distribution, and endpoint performance with beautiful, interactive charts.
                </p>
                <ul className="space-y-2 text-sm text-vault-text-secondary">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-vault-accent" />
                    Response time trends
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-vault-accent" />
                    Status code distribution
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-vault-accent" />
                    Endpoint performance ranking
                  </li>
                </ul>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Lock size={28} className="text-vault-accent" />
                  <h3 className="text-2xl font-bold text-vault-text">Enterprise Security</h3>
                </div>
                <p className="text-vault-text-secondary leading-relaxed mb-4">
                  Keep your API keys and monitoring data secure. Manage API keys with granular permissions, audit logs, and role-based access control designed for teams.
                </p>
                <ul className="space-y-2 text-sm text-vault-text-secondary">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-vault-accent" />
                    Secure key generation & rotation
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-vault-accent" />
                    Complete audit logs
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-vault-accent" />
                    Data encryption in transit
                  </li>
                </ul>
              </div>
              <div className="bg-vault-surface border border-vault-border rounded-lg p-8 h-80 flex items-center justify-center">
                <div className="text-center">
                  <img src = "src/public/feature3.png"/>
                </div>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className="bg-vault-surface border border-vault-border rounded-lg p-8 h-80 flex items-center justify-center order-2 md:order-1">
                <div className="text-center">
                  <img src = "src/public/feature4.png"/>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="flex items-center gap-3 mb-4">
                  <Code2 size={28} className="text-vault-accent" />
                  <h3 className="text-2xl font-bold text-vault-text">Seamless Integration</h3>
                </div>
                <p className="text-vault-text-secondary leading-relaxed mb-4">
                  Integrate with your application in minutes. Our lightweight SDKs work with any framework and language, with minimal performance overhead.
                </p>
                <ul className="space-y-2 text-sm text-vault-text-secondary">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-vault-accent" />
                    Multi-language support
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-vault-accent" />
                    Framework agnostic
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-vault-accent" />
                    Comprehensive documentation
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 px-8 border-t border-vault-border/50 bg-vault-surface/30">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold text-vault-text mb-4">How it works</h2>
            <p className="text-lg text-vault-text-secondary">Three simple steps to complete API visibility</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="absolute -left-4 -top-4 w-8 h-8 rounded-full bg-vault-accent flex items-center justify-center text-vault-bg font-bold text-sm">1</div>
              <div className="bg-vault-surface border border-vault-border rounded-lg p-6 pt-8">
                <h3 className="text-lg font-bold text-vault-text mb-3">Generate API Key</h3>
                <p className="text-vault-text-secondary text-sm leading-relaxed">Create and manage API keys from your dashboard with zero friction.</p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-4 -top-4 w-8 h-8 rounded-full bg-vault-accent flex items-center justify-center text-vault-bg font-bold text-sm">2</div>
              <div className="bg-vault-surface border border-vault-border rounded-lg p-6 pt-8">
                <h3 className="text-lg font-bold text-vault-text mb-3">Add to Your App</h3>
                <p className="text-vault-text-secondary text-sm leading-relaxed">Install our SDK and configure with your API key. Takes literally seconds.</p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-4 -top-4 w-8 h-8 rounded-full bg-vault-accent flex items-center justify-center text-vault-bg font-bold text-sm">3</div>
              <div className="bg-vault-surface border border-vault-border rounded-lg p-6 pt-8">
                <h3 className="text-lg font-bold text-vault-text mb-3">Monitor & Debug</h3>
                <p className="text-vault-text-secondary text-sm leading-relaxed">Watch your API requests flow in real-time. Analyze trends. Fix issues faster.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-8 border-t border-vault-border/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-vault-text mb-4">Ready to monitor your APIs?</h2>
          <p className="text-lg text-vault-text-secondary mb-10">
            Start monitoring your API traffic in minutes. No credit card required.
          </p>
          <button
            onClick={() => navigate('/register')}
            className="btn-primary px-8 py-3 font-semibold inline-flex items-center gap-2"
          >
            Create Free Account
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 border-t border-vault-border/50 text-center text-vault-text-tertiary text-sm">
        <p>© 2024 RequestVault. Built with ❤️ for developers.</p>
      </footer>
    </PublicLayout>
  )
}
