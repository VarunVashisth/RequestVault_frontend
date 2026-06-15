import { useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useNavigate } from 'react-router-dom'
import { AlertCircle } from 'lucide-react'

export default function SettingsPage() {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()

  const [settings] = useState({
    email: user?.email || '',
    username: user?.username || '',
  })

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-vault-text">Settings</h1>
        <p className="text-vault-text-secondary mt-1 text-sm">Manage your account and preferences</p>
      </div>

      {/* Account Settings */}
      <div className="card space-y-6">
        <div>
          <h2 className="text-base font-semibold text-vault-text mb-6">Account Settings</h2>
          
          {/* Email */}
          <div className="mb-6">
            <label className="label-base mb-2 block">Email Address</label>
            <input
              type="email"
              value={settings.email}
              disabled
              className="input-base w-full opacity-60"
              title="Email cannot be changed after registration"
            />
            <p className="text-xs text-vault-text-secondary mt-2">
              Your email is used for account identification (cannot be changed)
            </p>
          </div>

          {/* Username */}
          <div>
            <label className="label-base mb-2 block">Username</label>
            <input
              type="text"
              value={settings.username}
              disabled
              className="input-base w-full opacity-60"
              title="Username cannot be changed after registration"
            />
            <p className="text-xs text-vault-text-secondary mt-2">
              Username cannot be changed after account creation
            </p>
          </div>
        </div>

        <div className="border-t border-vault-border pt-6 bg-vault-accent/5 -mx-6 -mb-5 px-6 py-4 rounded">
          <p className="text-xs text-vault-text-secondary">
            Account details are managed at registration time. To update email or username, contact support or create a new account.
          </p>
        </div>
      </div>

      {/* API Keys Section */}
      <div className="card">
        <h2 className="text-base font-semibold text-vault-text mb-3">API Key Management</h2>
        <p className="text-vault-text-secondary text-sm mb-4">
          Manage your API credentials and generate new keys from the dedicated API Keys page.
        </p>
        <button
          onClick={() => navigate('/keys')}
          className="btn-primary px-4 py-2 text-sm font-medium"
        >
          Manage API Keys
        </button>
      </div>

      {/* Security */}
      <div className="card border-vault-warning/20 bg-vault-warning/5">
        <div className="flex items-start gap-3">
          <AlertCircle size={20} className="text-vault-warning flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h2 className="text-base font-semibold text-vault-text mb-3">Session Management</h2>
            <p className="text-sm text-vault-text-secondary mb-4">
              Sign out from your account on this device. You'll need to log in again to access your account.
            </p>
            <button
              onClick={handleLogout}
              className="btn-secondary px-4 py-2 text-sm font-medium"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
