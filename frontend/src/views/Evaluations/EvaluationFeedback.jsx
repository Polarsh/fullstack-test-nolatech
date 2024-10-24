import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

import { BiSave } from 'react-icons/bi'
import { MdCancel } from 'react-icons/md'

import { useAuth } from '../../context/AuthContext'
import { useEvaluation } from '../../context/EvaluationContext'
import { formatDate } from '../../utils/formatDate'

import TitlePageComponent from '../../shared/components/TitlePage'
import ButtonComponent, { ButtonStyle } from '../../shared/components/Button'
import { Controller, useForm } from 'react-hook-form'
import InputAreaComponent from '../../shared/components/InputArea'
import { yupResolver } from '@hookform/resolvers/yup'
import { feedbackEvaluationSchema } from '../../modules/evaluationTemplate/schemas/feedbackEvaluationSchema'

export default function EvaluationFeedbackPage() {
  const { evaluationId } = useParams()
  const navigate = useNavigate()

  const { user } = useAuth()
  const {
    evaluation,
    loading,
    fetchAssignedEvaluationById,
    addFeedbackToEvaluationTemplate,
  } = useEvaluation()

  useEffect(() => {
    if (user) {
      fetchAssignedEvaluationById(user.employeeId, evaluationId)
    }
  }, [])

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { comment: '' },
    resolver: yupResolver(feedbackEvaluationSchema),
  })

  if (loading) {
    return <div>Loading...</div>
  }

  if (!evaluation) {
    return <div>No se encontró la plantilla de evaluación.</div>
  }

  // Función para manejar el envío del formulario
  const onSubmit = async data => {
    try {
      const formattedData = {
        templateId: evaluation.evaluationTemplateId._id,
        comment: data.comment,
      }

      await addFeedbackToEvaluationTemplate(formattedData)
      navigateToMenu()
    } catch (error) {
      console.log(error)
    }
  }

  const navigateToMenu = () => {
    navigate('/evaluaciones')
  }

  return (
    <div className=' space-y-6'>
      <TitlePageComponent
        title='Dar feedback a la evaluación'
        description={`Puedes dar tus recomendaciones para mejorar la evaluación`}
      />

      <div className='bg-white shadow sm:rounded-lg px-4 py-5 sm:p-6'>
        <h2 className='text-md font-semibold mb-2 text-gray-800'>
          {evaluation.evaluationTemplateId.title}
        </h2>

        <div>
          <span className='text-sm text-gray-900'>Realizado el:</span>{' '}
          {formatDate(evaluation.completedAt)}
        </div>
      </div>

      {/* Mostrar categorías y preguntas */}
      {evaluation.responses.map((category, categoryIndex) => (
        <div
          key={category._id}
          className='bg-white shadow sm:rounded-lg px-4 py-5 sm:p-6'>
          <h3 className='text-md font-semibold mb-2 text-gray-800'>
            {`Categoría ${categoryIndex + 1}: ${category.categoryName}`}
          </h3>

          <div className=' divide-y'>
            {category.questions.map((question, questionIndex) => (
              <div key={question._id} className='py-2 border-gray-200'>
                <p className=' text-sm text-gray-700'>{`Pregunta ${questionIndex + 1}: ${question.question}`}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

      <form
        className='space-y-6 bg-white shadow sm:rounded-lg px-4 py-5 sm:p-6'
        onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name='comment'
          control={control}
          render={({ field }) => (
            <InputAreaComponent
              {...field}
              label='Comentario'
              placeholder='Ej. Definir de forma precisa las preguntas.'
              errors={errors.comment}
            />
          )}
        />

        {/* Botones de Cancelar y Guardar */}
        <div className='flex justify-end gap-6'>
          <ButtonComponent
            onClick={navigateToMenu}
            icon={MdCancel}
            label={'Cancelar'}
            variant={ButtonStyle.Cancel}
          />
          <ButtonComponent
            isSubmit={true}
            icon={BiSave}
            label={'Guardar'}
            variant={ButtonStyle.Fill}
          />
        </div>
      </form>
    </div>
  )
}
