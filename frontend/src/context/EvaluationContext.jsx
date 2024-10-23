import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

import EvaluationTemplateServices from '../modules/evaluationTemplate/evaluationServices'
import { useAuth } from './AuthContext'

const EvaluationContext = createContext()

export const EvaluationProvider = ({ children }) => {
  const { user } = useAuth()

  const [evaluations, setEvaluations] = useState([])
  const [evaluation, setEvaluation] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    console.log('Entra')
    if (user) {
      fetchEvaluationTemplates()
      console.log('Entra -----')
    }
  }, [user])

  // Función para obtener todas las plantillas de evaluación
  const fetchEvaluationTemplates = async () => {
    try {
      setLoading(true)
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
    try {
      setLoading(true)
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
  const fetchEvaluationsByEmployee = async employeeId => {
    try {
      setLoading(true)
      const employeeEvaluations =
        await EvaluationTemplateServices.getEvaluationsByEmployeeId(employeeId)
      setEvaluations(employeeEvaluations)
      /* toast.success('Evaluaciones del empleado cargadas correctamente') */
    } catch (err) {
      setError('Error al obtener las evaluaciones del empleado.')
      toast.error('Error al obtener las evaluaciones del empleado')
      console.error(err)
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
        fetchEvaluationsByEmployee,
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
