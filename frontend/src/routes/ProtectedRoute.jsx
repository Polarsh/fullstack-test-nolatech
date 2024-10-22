import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ redirectPath }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <div></div>
  }

  if (!user) {
    return <Navigate to={redirectPath} replace />
  }

  return <Outlet />
}
