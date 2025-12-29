import { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import api from '../utils/api'
import toast from 'react-hot-toast'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setUserInfo } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const { data } = await api.post('/users/login', { email, password })
      setUserInfo(data)
      localStorage.setItem('userInfo', JSON.stringify(data))
      toast.success('Welcome back!')
      navigate(data.role === 'admin' ? '/admin' : '/')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login Failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-purple-100 px-4">
      
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-xl p-8">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Sign in to continue to <span className="font-medium text-purple-600">PurpleMerit</span>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition text-black"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 hover:shadow-lg active:scale-[0.98] transition"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-600">
          New here?{' '}
          <Link
            to="/signup"
            className="text-purple-600 font-semibold hover:underline"
          >
            Create an account
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Login
