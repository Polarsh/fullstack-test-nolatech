import { handleServiceError } from '../../utils/handleServiceError'
import httpHelper, { setAuthToken } from '../../utils/httpHelper'

class AuthServices {
  async login(email, password) {
    try {
      const response = await httpHelper.post('/api/auth/login', {
        email,
        password,
      })
      const data = response.data.data
      const { token } = data

      if (token) {
        localStorage.setItem('token', token)
        setAuthToken(token)
      }

      return data
    } catch (error) {
      handleServiceError(error)
    }
  }

  logout() {
    localStorage.removeItem('token')
    setAuthToken(null)
  }

  getCurrentUser() {
    const token = localStorage.getItem('token')
    return token ? JSON.parse(atob(token.split('.')[1])) : null
  }
}

export default new AuthServices()
