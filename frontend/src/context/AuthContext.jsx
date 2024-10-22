import { createContext, useContext, useState } from 'react'

export const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider')
  }
  return context
}

const defaultUser = {
  name: 'Admin',
  email: 'Admin@gmail.com',
  id: 'xasd',
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(defaultUser)
  const [loading, setLoading] = useState(false)

  return (
    <AuthContext.Provider
      value={{
        currentUser,
      }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
