import * as yup from 'yup'

export const feedbackEvaluationSchema = yup.object().shape({
  comment: yup.string().required('El comentario es requerido'),
})
