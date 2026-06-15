import { useNavigate } from 'react-router-dom'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-vault-bg">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 border-b border-vault-border bg-vault-bg/95 backdrop-blur-sm z-40">
        <div className="max-w-7xl mx-auto h-full px-8 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
          >
            <span  className="text-2xl font-semibold tracking-tight"
             style={{  fontFamily: '"DM Serif Display", serif' }}
             >
              Request<span className="text-vault-accent">Vault
              </span>
              </span>
          </button>

          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm text-vault-text-secondary hover:text-vault-text transition-colors font-medium"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm text-vault-text-secondary hover:text-vault-text transition-colors font-medium"
            >
              How it works
            </a>
            <a
              href="/docs"
              className="text-sm text-vault-text-secondary hover:text-vault-text transition-colors font-medium"
            >
              Documentation
            </a>
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 rounded text-sm font-semibold text-vault-accent hover:text-vault-accent-hover transition-colors"
            >
              Sign in
            </button>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="pt-16">
        {children}
      </main>
    </div>
  )
}
