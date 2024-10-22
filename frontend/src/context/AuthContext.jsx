import { createContext, useContext, useEffect, useState } from 'react'

import AuthServices from '../modules/auth/authServices'
import { toast } from 'sonner'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const currentUser = AuthServices.getCurrentUser()
      setUser(currentUser)
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      setLoading(true)
      const data = await AuthServices.login(email, password)
      setUser(data.user)
      toast.success('Inicio de sesión exitoso')
    } catch (error) {
      toast.error('Error al iniciar sesión. Verifica tus credenciales')
      console.error('Error al iniciar sesión:', error)
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    AuthServices.logout()
    setUser(null)
    toast.success('Cierre de sesión exitoso')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
