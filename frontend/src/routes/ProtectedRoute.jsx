import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ redirectPath }) {
  const { currentUser } = useAuth()

  if (!currentUser) {
    return <Navigate to={redirectPath} replace />
  }

  return <Outlet />
}
