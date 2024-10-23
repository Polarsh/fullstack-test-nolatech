import * as yup from 'yup'

export const assignEvaluationSchema = yup.object().shape({
  employeeId: yup.string().required('El empleado es requerido'),
  evaluationId: yup.string().required('La evaluación es requerida'),
})
