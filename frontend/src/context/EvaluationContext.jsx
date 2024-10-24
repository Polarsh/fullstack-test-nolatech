import { createContext, useContext, useState } from 'react'
import { toast } from 'sonner'

import EvaluationTemplateServices from '../modules/evaluationTemplate/evaluationServices'

const EvaluationContext = createContext()

export const EvaluationProvider = ({ children }) => {
  const [evaluations, setEvaluations] = useState([])
  const [evaluation, setEvaluation] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Función para obtener todas las plantillas de evaluación
  const fetchEvaluationTemplates = async () => {
    setLoading(true)
    setEvaluations([])
    try {
      const templates =
        await EvaluationTemplateServices.getAllEvaluationTemplates()

      setEvaluations(templates)
      /* toast.success('Plantillas de evaluación cargadas correctamente') */
    } catch (err) {
      setError('Error al cargar las plantillas de evaluación.')
      toast.error('Error al cargar las plantillas de evaluación')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Función para obtener una plantilla de evaluación por ID
  const fetchEvaluationTemplateById = async templateId => {
    setLoading(true)
    setEvaluation(null)
    try {
      const template =
        await EvaluationTemplateServices.getEvaluationTemplateById(templateId)

      setEvaluation(template)
      /* toast.success('Plantilla de evaluación obtenida correctamente') */
    } catch (err) {
      setError('Error al obtener la plantilla de evaluación.')
      toast.error('Error al obtener la plantilla de evaluación')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Función para crear una nueva plantilla de evaluación
  const createEvaluationTemplate = async templateData => {
    try {
      setLoading(true)

      await EvaluationTemplateServices.createEvaluationTemplate(templateData)

      fetchEvaluationTemplates()
      toast.success('Plantilla de evaluación creada correctamente')
    } catch (err) {
      setError('Error al crear la plantilla de evaluación.')
      toast.error('Error al crear la plantilla de evaluación')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Función para actualizar una plantilla de evaluación por ID
  const updateEvaluationTemplate = async (templateId, updatedData) => {
    try {
      setLoading(true)

      await EvaluationTemplateServices.updateEvaluationTemplate(
        templateId,
        updatedData
      )

      fetchEvaluationTemplates()
      toast.success('Plantilla de evaluación actualizada correctamente')
    } catch (err) {
      setError('Error al actualizar la plantilla de evaluación.')
      toast.error('Error al actualizar la plantilla de evaluación')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Función para obtener las evaluaciones asignadas a un empleado por su ID
  const fetchEvaluationsByEmployeeId = async employeeId => {
    setLoading(true)
    setEvaluations([])

    try {
      const evaluations =
        await EvaluationTemplateServices.getEvaluationsByEmployeeId(employeeId)

      setEvaluations(evaluations)
      /* toast.success('Evaluaciones del empleado cargadas correctamente') */
    } catch (err) {
      setError('Error al obtener las evaluaciones del empleado.')
      toast.error('Error al obtener las evaluaciones del empleado')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Asignar evaluacion a un empleado
  const assignEvalutionToEmployee = async evaluationData => {
    try {
      setLoading(true)

      await EvaluationTemplateServices.assignEvaluationToEmployee(
        evaluationData
      )

      toast.success('Plantilla de evaluación asignada correctamente')
    } catch (err) {
      setError('Error al asignar la plantilla de evaluación.')
      toast.error(err.message)

      throw new Error('')
    } finally {
      setLoading(false)
    }
  }

  // Función para obtener las evaluaciones segun el evaluador
  const fetchEvaluationsByEvaluatorId = async employeeId => {
    setLoading(true)
    setEvaluations([])

    try {
      const evaluations =
        await EvaluationTemplateServices.getEvaluationsByEvaluatorId(employeeId)

      setEvaluations(evaluations.data)
      /* toast.success('Evaluaciones del empleado cargadas correctamente') */
    } catch (err) {
      setError('Error al obtener las evaluaciones del empleado.')
      toast.error('Error al obtener las evaluaciones del empleado')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Función para obtener las evaluaciones segun el evaluador
  const getAllAssignedEvaluations = async () => {
    setLoading(true)
    setEvaluations([])

    try {
      const evaluations =
        await EvaluationTemplateServices.getAllAssignedEvaluations()

      setEvaluations(evaluations)
      /* toast.success('Evaluaciones del empleado cargadas correctamente') */
    } catch (err) {
      setError('Error al obtener las evaluaciones.')
      toast.error('Error al obtener las evaluaciones ')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Función para obtener las evaluaciones segun el evaluador
  const fetchAssignedEvaluationById = async (employeeId, evaluationId) => {
    setLoading(true)
    setEvaluation(null)

    try {
      const evaluations =
        await EvaluationTemplateServices.getEvaluationsByEvaluatorId(employeeId)

      const evaluation = evaluations.data.filter(
        evaluation => evaluation._id === evaluationId
      )[0]

      setEvaluation(evaluation)
      /* toast.success('Evaluaciones del empleado cargadas correctamente') */
    } catch (err) {
      setError('Error al obtener las evaluaciones del empleado.')
      toast.error('Error al obtener las evaluaciones del empleado')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Asignar evaluacion a un empleado
  const completeEvaluation = async evaluationData => {
    try {
      setLoading(true)

      await EvaluationTemplateServices.completeEvaluation(evaluationData)

      toast.success('Respuestas enviadas con éxito')
    } catch (err) {
      setError('Error al enviar las respuestas.')
      toast.error(err.message)

      throw new Error('')
    } finally {
      setLoading(false)
    }
  }

  // Añadir feedback
  const addFeedbackToEvaluationTemplate = async evaluationData => {
    try {
      setLoading(true)

      await EvaluationTemplateServices.addFeedbackToEvaluationTemplate(
        evaluationData
      )

      toast.success('Feedback añadido con éxito')
    } catch (err) {
      setError('Error al enviar el feedback.')
      toast.error(err.message)

      throw new Error('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <EvaluationContext.Provider
      value={{
        evaluations,
        evaluation,
        fetchEvaluationTemplates,
        fetchEvaluationTemplateById,
        createEvaluationTemplate,
        updateEvaluationTemplate,
        fetchEvaluationsByEmployeeId,
        assignEvalutionToEmployee,
        fetchEvaluationsByEvaluatorId,
        fetchAssignedEvaluationById,
        completeEvaluation,
        addFeedbackToEvaluationTemplate,
        getAllAssignedEvaluations,
        loading,
        error,
      }}>
      {children}
    </EvaluationContext.Provider>
  )
}

// Hook para usar el contexto
export const useEvaluation = () => {
  return useContext(EvaluationContext)
}
