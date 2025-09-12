import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { useAuthStore } from '../state/authStore'
import Button from '../components/Button'
import Card from '../components/Card'

const Login = () => {
  const navigate = useNavigate()
  const { login, loading } = useAuthStore()
  const [formData, setFormData] = useState({
    email: 'demo@frebud.com',
    password: 'password123'
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    const result = await login(formData)
    
    if (result.success) {
      navigate('/')
    } else {
      setErrors({ general: result.error || 'Login failed' })
    }
  }

  const handleDemoLogin = async () => {
    const result = await login({
      email: 'demo@frebud.com',
      password: 'password123'
    })
    
    if (result.success) {
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
            FreBud
          </h1>
          <p className="text-base-content/70">
            Your travel companion awaits
          </p>
        </div>

        <Card className="p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
            <p className="text-base-content/60">
              Sign in to continue your travel journey
            </p>
          </div>

          {errors.general && (
            <div className="alert alert-error mb-4">
              <span>{errors.general}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/60" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={`
                    input input-bordered w-full pl-10
                    ${errors.email ? 'input-error' : ''}
                  `}
                />
              </div>
              {errors.email && (
                <p className="text-error text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/60" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={`
                    input input-bordered w-full pl-10 pr-10
                    ${errors.password ? 'input-error' : ''}
                  `}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content/60 hover:text-base-content"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-error text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" />
                <span className="text-sm">Remember me</span>
              </label>
              <button
                type="button"
                className="text-sm text-primary hover:text-primary-focus"
                onClick={() => alert('Forgot password functionality')}
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={loading}
              className="mt-6"
            >
              Sign In
            </Button>
          </form>

          <div className="divider my-6">or</div>

          <Button
            variant="outline"
            fullWidth
            onClick={handleDemoLogin}
            loading={loading}
          >
            Try Demo Account
          </Button>

          <p className="text-center text-sm text-base-content/60 mt-6">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="text-primary hover:text-primary-focus font-medium"
            >
              Sign up
            </Link>
          </p>
        </Card>

        {/* Demo Credentials */}
        <Card className="mt-4 p-4 bg-info/10 border-info/20">
          <div className="text-center">
            <p className="text-sm text-info font-medium mb-2">Demo Credentials</p>
            <p className="text-xs text-info/80">
              Email: demo@frebud.com<br />
              Password: password123
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Login