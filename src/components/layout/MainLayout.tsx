import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { Menu, X, LogOut, Settings, Code, Key, Home, FileText } from 'lucide-react'
import clsx from 'clsx'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { href: '/requests', label: 'Requests', icon: FileText },
    { href: '/keys', label: 'API Keys', icon: Key },
    { href: '/docs', label: 'Documentation', icon: Code },
    { href: '/settings', label: 'Settings', icon: Settings },
  ]

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const isActive = (href: string) => location.pathname === href

  return (
    <div className="flex h-screen bg-vault-bg">
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-40 lg:hidden btn-secondary p-2"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed lg:relative w-64 h-full bg-vault-surface border-r border-vault-border transition-transform duration-200 z-30 flex flex-col',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className="px-6 py-6 border-b border-vault-border">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-vault-accent to-vault-accent-muted rounded flex items-center justify-center font-bold text-vault-bg text-sm">
              V
            </div>
            <span className="text-lg font-semibold text-vault-text">RequestVault</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map(({ href, label, icon: Icon }) => (
            <button
              key={href}
              onClick={() => {
                navigate(href)
                setSidebarOpen(false)
              }}
              className={clsx(
                'w-full flex items-center gap-3 px-4 py-2.5 rounded text-sm font-medium transition-all duration-200',
                isActive(href)
                  ? 'bg-vault-accent/15 text-vault-accent'
                  : 'text-vault-text-secondary hover:text-vault-text hover:bg-vault-border/30'
              )}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        {/* User info and logout */}
        <div className="border-t border-vault-border p-3 space-y-3">
          <div className="px-4 py-3 bg-vault-border/30 rounded text-sm">
            <div className="text-xs text-vault-text-tertiary font-medium mb-1 uppercase tracking-wide">Signed in as</div>
            <div className="text-sm font-medium text-vault-text truncate break-all">{user?.email}</div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded text-sm text-vault-text-secondary hover:text-vault-text hover:bg-vault-border/30 transition-all duration-200"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="h-16 border-b border-vault-border bg-vault-surface flex items-center justify-between px-8 sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <h1 className="text-sm font-semibold text-vault-text hidden sm:block">RequestVault</h1>
          </div>
          <div className="flex items-center gap-4">
            {/* Space for future notifications or user actions */}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto bg-vault-bg">
          {children}
        </div>
      </main>
    </div>
  )
}
