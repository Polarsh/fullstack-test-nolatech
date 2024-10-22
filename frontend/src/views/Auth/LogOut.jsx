import { useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'

export default function LogOutView() {
  const { logout } = useAuth()

  useEffect(() => {
    logout()
  }, [logout])

  return <div>Cerrando sesión...</div>
}
