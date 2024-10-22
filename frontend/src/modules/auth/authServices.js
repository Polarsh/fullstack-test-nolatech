import httpHelper, { setAuthToken } from '../../utils/httpHelper'

const AuthServices = {
  login: async (email, password) => {
    try {
      const response = await httpHelper.post('/api/auth/login', {
        email,
        password,
      })

      const data = response.data.data

      const { token } = data
      if (token) {
        localStorage.setItem('token', token) // Guardar el token en el almacenamiento local
        setAuthToken(token) // Configurar el token para futuras solicitudes
      }

      return data
    } catch (error) {
      console.error('Error al iniciar sesión:', error)
      throw error
    }
  },

  logout: () => {
    localStorage.removeItem('token')
    setAuthToken(null)
  },

  getCurrentUser: () => {
    const token = localStorage.getItem('token')
    return token ? JSON.parse(atob(token.split('.')[1])) : null
  },
}

export default AuthServices
