import { handleServiceError } from '../../utils/handleServiceError'
import httpHelper from '../../utils/httpHelper'

class EvaluationTemplateServices {
  // Obtener todas las plantillas de evaluación
  async getAllEvaluationTemplates() {
    try {
      const response = await httpHelper.get('/api/evaluations')
      return response.data.data
    } catch (error) {
      handleServiceError(error)
    }
  }

  // Obtener una plantilla de evaluación por ID
  async getEvaluationTemplateById(templateId) {
    try {
      const response = await httpHelper.get(`/api/evaluations/${templateId}`)

      return response.data.data.evaluationTemplate
    } catch (error) {
      handleServiceError(error)
    }
  }

  // Crear una nueva plantilla de evaluación
  async createEvaluationTemplate(templateData) {
    try {
      const response = await httpHelper.post('/api/evaluations', templateData)
      return response.data.data
    } catch (error) {
      handleServiceError(error)
    }
  }

  // Actualizar una plantilla de evaluación por ID
  async updateEvaluationTemplate(templateId, updatedData) {
    try {
      const response = await httpHelper.put(
        `/api/evaluations/${templateId}`,
        updatedData
      )
      return response.data.data
    } catch (error) {
      handleServiceError(error)
    }
  }

  // Obtener evaluaciones por empleado Id // todo
  async getEvaluationsByEmployeeId(employeeId) {
    try {
      const response = await httpHelper.get(
        `/api/evaluations/employee/${employeeId}`
      )
      return response.data.data
    } catch (error) {
      handleServiceError(error)
    }
  }

  // Asignar evaluación a empleado // todo // funciona pero falta revisar
  async assignEvaluationToEmployee(assignData) {
    try {
      const response = await httpHelper.post(
        `/api/evaluations/assign`,
        assignData
      )
      return response.data.data
    } catch (error) {
      handleServiceError(error)
    }
  }
}

export default new EvaluationTemplateServices()
