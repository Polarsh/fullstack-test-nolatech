import * as yup from 'yup'

export const completeEvaluationSchema = yup.object().shape({
  answers: yup.array().of(
    yup.object().shape({
      questions: yup.array().of(
        yup.object().shape({
          answer: yup
            .number()
            .required('Debes seleccionar una respuesta')
            .min(1, 'La respuesta debe ser de al menos 1')
            .max(5, 'La respuesta no puede ser mayor a 5'),
        })
      ),
    })
  ),
})
