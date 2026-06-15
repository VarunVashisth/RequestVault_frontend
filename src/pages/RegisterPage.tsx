import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import PublicLayout from '@/components/layout/PublicLayout'
import { Eye, EyeOff, Lock, User } from 'lucide-react'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { register , login, error: storeError } = useAuthStore()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')






  const handleSubmit = async (
    e: React.FormEvent
  ) => {
  
    e.preventDefault()
  
    setError('')

    if (username.trim().length < 3) {
      setError('Username must be at least 3 characters')
      return
    }
  
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
  
    if (password.length < 8) {
      setError(
        'Password must be at least 8 characters'
      )
      return
    }
  
    try {
  
      await register(
        username,
        password
      )
  
      await login(
        username,
        password
      )
  
      navigate('/dashboard')
  
    } catch (err: any) {
  
      setError(
        err.response?.data?.detail ||
        'Registration failed'
      )
  
    }
  }

  return (
    <PublicLayout>
      <div className="min-h-screen flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="card">
            <h1 className="text-2xl font-bold text-vault-text mb-2">Create Account</h1>
            <p className="text-vault-text-secondary text-sm mb-8">
              Join RequestVault and start monitoring your APIs
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
                  <User className="absolute left-3 top-3 text-vault-text-secondary" size={18} />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="johndoe"
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

              {/* Confirm Password */}
              <div>
                <label className="label-base mb-2 block">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-vault-text-secondary" size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="input-base pl-10 pr-10 w-full"
                    required
                  />
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="btn-primary w-full py-2.5"
              >
                Create Account
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 pt-8 border-t border-vault-border text-center text-sm">
              <p className="text-vault-text-secondary">
                Already have an account?{' '}
                <Link to="/login" className="text-vault-accent hover:text-vault-accent-hover transition-colors font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
