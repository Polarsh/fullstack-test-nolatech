import * as yup from 'yup'

export const evaluationTemplateSchema = yup.object().shape({
  title: yup
    .string()
    .trim()
    .required('El título es requerido')
    .min(3, 'El título debe tener al menos 3 caracteres')
    .max(100, 'El título no puede exceder los 100 caracteres'),

  categories: yup
    .array()
    .of(
      yup.object().shape({
        categoryName: yup
          .string()
          .trim()
          .required('El nombre de la categoría es requerido')
          .min(3, 'El nombre de la categoría debe tener al menos 3 caracteres')
          .max(
            50,
            'El nombre de la categoría no puede exceder los 50 caracteres'
          ),

        questions: yup
          .array()
          .of(
            yup.object().shape({
              question: yup
                .string()
                .trim()
                .required('La pregunta es requerida')
                .min(5, 'La pregunta debe tener al menos 5 caracteres')
                .max(200, 'La pregunta no puede exceder los 200 caracteres'),
            })
          )
          .min(1, 'Debe haber al menos una pregunta en cada categoría'), // Validar que al menos haya una pregunta
      })
    )
    .min(1, 'Debe haber al menos una categoría en la evaluación'), // Validar que haya al menos una categoría
})
