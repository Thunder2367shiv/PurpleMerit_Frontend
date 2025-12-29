import { useState, useEffect } from 'react'
import api from '../utils/api'
import toast from 'react-hot-toast'
import { Loader2, CheckCircle, XCircle } from 'lucide-react'

const AdminDashboard = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const { data } = await api.get(`/users?pageNumber=${page}`)
      setUsers(data.users)
      setTotalPages(data.pages)
    } catch (err) {
      toast.error('Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [page])

  const toggleStatus = async (user) => {
    const action = user.status === 'active' ? 'deactivate' : 'activate'
    if (!window.confirm(`Are you sure you want to ${action} ${user.fullName}?`)) return

    try {
      await api.put(`/users/${user._id}/status`, {
        status: user.status === 'active' ? 'inactive' : 'active',
      })
      toast.success('Status updated successfully')
      fetchUsers()
    } catch (err) {
      toast.error('Operation failed')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-purple-100">
        <Loader2 className="animate-spin text-purple-600" size={48} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 px-4 py-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Admin Dashboard
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage users, roles, and access
          </p>
        </div>

        {/* Table Card */}
        <div className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr className="text-xs uppercase tracking-wide text-gray-600">
                <th className="px-6 py-4">Full Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {users.map((u) => (
                <tr
                  key={u._id}
                  className="hover:bg-purple-50/40 transition"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {u.fullName}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {u.email}
                  </td>

                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase bg-gray-100 text-gray-700">
                      {u.role}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        u.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => toggleStatus(u)}
                      className={`p-2 rounded-xl transition hover:scale-105 ${
                        u.status === 'active'
                          ? 'text-red-600 bg-red-50 hover:bg-red-100'
                          : 'text-green-600 bg-green-50 hover:bg-green-100'
                      }`}
                    >
                      {u.status === 'active' ? (
                        <XCircle size={22} />
                      ) : (
                        <CheckCircle size={22} />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-8 flex justify-center gap-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-2 rounded-xl font-semibold transition ${
                page === i + 1
                  ? 'bg-purple-600 text-white shadow'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
