import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import PublicLayout from '@/components/layout/PublicLayout'
import { Eye, EyeOff, User, Lock } from 'lucide-react'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login, loading, error: storeError } = useAuthStore()

  const [username, setUsername] = useState('')  
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      await login(username, password)
      navigate('/dashboard')
    } catch (err: any) {
      const errorMsg = err.response?.data?.detail || 'Invalid username or password'
      setError(errorMsg)
    }
  }

  return (
    <PublicLayout>
      <div className="min-h-screen flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="card">
            <h1 className="text-2xl font-bold text-vault-text mb-2">Sign in</h1>
            <p className="text-vault-text-secondary text-sm mb-8">
              Welcome back to RequestVault
            </p>

            {(error || storeError) && (
              <div className="mb-6 p-4 bg-vault-danger/10 border border-vault-danger/30 rounded-lg text-vault-danger text-sm">
                {error || storeError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username */}
              <div>
                <label className="label-base mb-2 block">Username</label>
                <div className="relative">
                  <User
                    className="absolute left-3 top-3 text-vault-text-secondary"
                    size={18}
                  />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="your_username"
                    className="input-base pl-10 w-full"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="label-base mb-2 block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-vault-text-secondary" size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="input-base pl-10 pr-10 w-full"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-vault-text-secondary hover:text-vault-text transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-2.5 font-medium"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 pt-8 border-t border-vault-border text-center text-sm">
              <p className="text-vault-text-secondary mb-4">
                Don't have an account?{' '}
                <Link to="/register" className="text-vault-accent hover:text-vault-accent-hover transition-colors font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
