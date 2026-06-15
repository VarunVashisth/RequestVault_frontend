import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import PublicLayout from '@/components/layout/PublicLayout'
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react'
import { authService } from '@/services/authService'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { login, loading, error: storeError } = useAuthStore()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [sendingOtp, setSendingOtp] = useState(false)
  const [verifyingOtp, setVerifyingOtp] = useState(false)


  const handleSendOtp = async () => {
  
    setError('')
  
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
  
    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }
  
    try {
  
      setSendingOtp(true)
  
      await authService.requestOtp({
        username,
        email,
        password
      })
  
      setOtpSent(true)
  
    } catch (err: any) {
  
      setError(
        err.response?.data?.detail ||
        'Failed to send verification code'
      )
  
    } finally {
  
      setSendingOtp(false)
  
    }
  }

  const handleVerifyOtp = async () => {

    setError('')
  
    try {
  
      setVerifyingOtp(true)
  
      await authService.verifyOtp({
        username,
        email,
        password,
        otp
      })
  
      await login(
        email,
        password
      )
  
      navigate('/dashboard')
  
    } catch (err: any) {
  
      setError(
        err.response?.data?.detail ||
        'Verification failed'
      )
  
    } finally {
  
      setVerifyingOtp(false)
  
    }
  }


  const handleSubmit = (
    e: React.FormEvent
  ) => {
  
    e.preventDefault()
  
    if (!otpSent) {
      handleSendOtp()
    } else {
      handleVerifyOtp()
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

              {/* Email */}
              <div>
                <label className="label-base mb-2 block">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-vault-text-secondary" size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
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
              {/*otp*/}
              {otpSent && (
                <div>
                  <label className="label-base mb-2 block">
                    Verification Code
                  </label>
              
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value)
                    }
                    placeholder="123456"
                    maxLength={6}
                    className="input-base w-full text-center tracking-[0.3em]"
                    required
                  />
              
                  <p className="text-xs text-vault-text-secondary mt-2">
                    Verification code sent to {email}
                  </p>
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={
                  sendingOtp ||
                  verifyingOtp
                }
                className="btn-primary w-full py-2.5"
              >
                {!otpSent
                  ? (
                    sendingOtp
                      ? 'Sending Code...'
                      : 'Send Verification Code'
                  )
                  : (
                    verifyingOtp
                      ? 'Creating Account...'
                      : 'Verify & Create Account'
                  )}
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
