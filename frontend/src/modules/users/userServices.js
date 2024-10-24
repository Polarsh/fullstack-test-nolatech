import { handleServiceError } from '../../utils/handleServiceError'
import httpHelper from '../../utils/httpHelper'

class UserServices {
  async createUser(user) {
    try {
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

  async getUserById(userId) {
    try {
      const response = await httpHelper.get(`/api/employees/${userId}`)
      return response.data.data.data
    } catch (error) {
      handleServiceError(error)
    }
  }

  async getUserReportById(userId) {
    try {
      const response = await httpHelper.get(`/api/reports/employee/${userId}`)
      return response.data.data.report
    } catch (error) {
      handleServiceError(error)
    }
  }
}

export default new UserServices()
