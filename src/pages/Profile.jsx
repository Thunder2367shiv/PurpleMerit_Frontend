import { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import api from '../utils/api'
import toast from 'react-hot-toast'

const Profile = () => {
  const { userInfo, setUserInfo } = useContext(AuthContext)
  const [fullName, setFullName] = useState(userInfo?.fullName || '')
  const [email, setEmail] = useState(userInfo?.email || '')
  const [password, setPassword] = useState('')

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const { data } = await api.put('/users/profile', {
        fullName,
        email,
        password,
      })
      const updatedUser = { ...userInfo, ...data }
      setUserInfo(updatedUser)
      localStorage.setItem('userInfo', JSON.stringify(updatedUser))
      toast.success('Profile updated successfully')
      setPassword('')
    } catch (err) {
      toast.error('Update failed')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 px-4 py-12">
      <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-xl p-8">
        
        {/* Header */}
        <div className="flex items-center gap-5 mb-8">
          <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 text-xl font-bold">
            {userInfo?.fullName?.charAt(0)}
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900">
              User Profile
            </h2>
            <p className="text-sm text-gray-500">
              Manage your personal information
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleUpdate} className="space-y-6">
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="text-black w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              placeholder='Write email here'
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              placeholder="Leave blank to keep current password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition text-black"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 hover:shadow-lg active:scale-[0.98] transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Profile
