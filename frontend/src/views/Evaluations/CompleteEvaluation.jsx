import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'

import { MdCancel } from 'react-icons/md'
import { BiSave } from 'react-icons/bi'

import TitlePageComponent from '../../shared/components/TitlePage'
import ButtonComponent, { ButtonStyle } from '../../shared/components/Button'

import { completeEvaluationSchema } from '../../modules/evaluationTemplate/schemas/completeEvaluationSchema'
import { useEvaluation } from '../../context/EvaluationContext'
import { useAuth } from '../../context/AuthContext'

export default function CompleteEvaluationPage() {
  const { evaluationId } = useParams()
  const navigate = useNavigate()

  const { user } = useAuth()

  const {
    evaluation,
    fetchAssignedEvaluationById,
    completeEvaluation,
    loading,
  } = useEvaluation()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(completeEvaluationSchema),
  })

  useEffect(() => {
    if (user) {
      fetchAssignedEvaluationById(user.employeeId, evaluationId)
    }
  }, [])

  const onSubmit = async data => {
    const formattedResponse = {
      evaluationId,
      responses: evaluation.responses.map((category, categoryIndex) => ({
        categoryName: category.categoryName,
        questions: category.questions.map((question, questionIndex) => ({
          question: question.question,
          answer: data.answers[categoryIndex]?.questions[questionIndex]?.answer,
        })),
      })),
    }

    await completeEvaluation(formattedResponse)

    navigateToMenu()
  }

  const navigateToMenu = () => {
    navigate('/evaluaciones')
  }

  if (loading) {
    return <>Cargando</>
  }

  if (!evaluation) {
    return <>Cargando</>
  }

  return (
    <div className='space-y-6'>
      <TitlePageComponent title={'Completa la evaluación'} />

      <div className='bg-white shadow sm:rounded-lg px-4 py-5 sm:p-6'>
        <h2 className='text-md font-semibold mb-2 text-gray-800'>
          {evaluation.evaluationTemplateId?.title}
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
          <div>
            <span className='text-sm text-gray-900'>Estás evaluando a :</span>{' '}
            {evaluation.evaluateeId?.name}
          </div>
        </div>
      </div>

      {/* Escala del 1 al 5 con leyendas */}
      <div className='bg-white shadow sm:rounded-lg px-4 py-5 sm:p-6'>
        <h3 className='text-md font-semibold mb-2 text-gray-800'>
          Escala de Evaluación
        </h3>
        <div className='grid grid-cols-3 sm:grid-cols-5 gap-2 text-center'>
          <div className='p-2 bg-red-500 shadow rounded-lg'>
            <span className='block font-semibold text-white'>1</span>
            <span className='text-sm text-gray-100'>Debe mejorar</span>
          </div>
          <div className='p-2 bg-yellow-400 shadow rounded-lg'>
            <span className='block font-semibold text-gray-800'>2</span>
            <span className='text-sm text-gray-700'>Insuficiente</span>
          </div>
          <div className='p-2 bg-yellow-300 shadow rounded-lg'>
            <span className='block font-semibold text-gray-800'>3</span>
            <span className='text-sm text-gray-700'>Aceptable</span>
          </div>
          <div className='p-2 bg-green-400 shadow rounded-lg'>
            <span className='block font-semibold text-gray-800'>4</span>
            <span className='text-sm text-gray-700'>Bueno</span>
          </div>
          <div className='p-2 bg-green-500 shadow rounded-lg'>
            <span className='block font-semibold text-white'>5</span>
            <span className='text-sm text-gray-100'>Sobresaliente</span>
          </div>
        </div>
      </div>

      {/* Mostrar categorías y preguntas */}
      <form onSubmit={handleSubmit(onSubmit)} className=' space-y-6'>
        {evaluation.responses.map((category, categoryIndex) => (
          <div
            key={category._id}
            className='bg-white shadow sm:rounded-lg px-4 py-5 sm:p-6'>
            <h3 className='text-md font-semibold mb-2 text-gray-800'>
              {`Categoría ${categoryIndex + 1}: ${category.categoryName}`}
            </h3>

            <div className='divide-y'>
              {category.questions.map((question, questionIndex) => (
                <div key={question._id} className='py-2 border-gray-200'>
                  <p className='text-sm text-gray-700'>{`Pregunta ${
                    questionIndex + 1
                  }: ${question.question}`}</p>

                  <Controller
                    name={`answers[${categoryIndex}].questions[${questionIndex}].answer`}
                    control={control}
                    render={({ field }) => (
                      <div className='grid grid-cols-3 sm:grid-cols-5 gap-2 py-4'>
                        {[1, 2, 3, 4, 5].map(value => (
                          <label key={value} className=' flex items-center'>
                            <input
                              type='radio'
                              value={value}
                              checked={field.value === value}
                              onChange={e =>
                                field.onChange(Number(e.target.value))
                              }
                              className='h-4 w-4 border-gray-300 text-primary focus:ring-primary'
                            />

                            <label
                              htmlFor={value}
                              className='ml-3 block text-sm font-medium leading-6 text-gray-900'>
                              {value}
                            </label>
                          </label>
                        ))}
                      </div>
                    )}
                  />
                  {errors?.answers?.[categoryIndex]?.questions?.[questionIndex]
                    ?.answer && (
                    <p className='text-red-500'>
                      {
                        errors.answers[categoryIndex].questions[questionIndex]
                          .answer.message
                      }
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className='flex justify-end gap-4'>
          <ButtonComponent
            onClick={navigateToMenu}
            icon={MdCancel}
            label={'Cancelar'}
            variant={ButtonStyle.Cancel}
          />
          <ButtonComponent
            isSubmit={true}
            icon={BiSave}
            label={'Enviar'}
            variant={ButtonStyle.Fill}
          />
        </div>
      </form>
    </div>
  )
}
