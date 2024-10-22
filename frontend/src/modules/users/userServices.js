import { handleServiceError } from '../../utils/handleServiceError'
import httpHelper from '../../utils/httpHelper'

class UserServices {
  async createUser(user) {
    try {
      console.log(
        'createUser:',
        httpHelper.defaults.headers.common.Authorization
      )
      const response = await httpHelper.post('/api/auth/register', user)
      return response.data.data
    } catch (error) {
      handleServiceError(error)
    }
  }

  async getAllUsers() {
    try {
      const response = await httpHelper.get('/api/employees')
      return response.data.data
    } catch (error) {
      handleServiceError(error)
    }
  }

  async getUserbyId(userId) {
    try {
      const response = await httpHelper.get(`/api/employees/${userId}`)
      return response.data.data
    } catch (error) {
      handleServiceError(error)
    }
  }
}

export default new UserServices()
