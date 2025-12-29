import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { LogOut, User, Shield } from 'lucide-react'

const Navbar = () => {
  const { userInfo, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (!userInfo) return null

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-tight text-purple-700 hover:text-purple-800 transition"
        >
          Purple<span className="text-gray-900">Merit</span>
        </Link>

        {/* Right */}
        <div className="flex items-center gap-5">
          
          {/* User */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold">
              {userInfo.fullName?.charAt(0)}
            </div>
            <div className="leading-tight text-right">
              <p className="text-sm font-semibold text-gray-900">
                {userInfo.fullName}
              </p>
              <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 uppercase font-medium">
                {userInfo.role}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            
            {userInfo.role === 'admin' && (
              <Link
                to="/admin"
                title="Admin Dashboard"
                className="p-2 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 hover:scale-105 transition"
              >
                <Shield size={18} />
              </Link>
            )}

            <Link
              to="/"
              title="Profile"
              className="p-2 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105 transition"
            >
              <User size={18} />
            </Link>

            <button
              onClick={handleLogout}
              title="Logout"
              className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 hover:scale-105 transition"
            >
              <LogOut size={18} />
            </button>

          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
