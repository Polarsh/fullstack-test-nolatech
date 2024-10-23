import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

import TitlePageComponent from '../../shared/components/TitlePage'
import { useEvaluation } from '../../context/EvaluationContext'
import { formatDate } from '../../utils/formatDate'
import ButtonComponent, { ButtonStyle } from '../../shared/components/Button'
import { MdBackspace } from 'react-icons/md'
import { BiEdit } from 'react-icons/bi'

export default function ViewEvaluationPage() {
  const { evaluationId } = useParams()
  const navigate = useNavigate()

  const { evaluation, loading, fetchEvaluationTemplateById } = useEvaluation()

  useEffect(() => {
    if (evaluationId) {
      fetchEvaluationTemplateById(evaluationId)
    }
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!evaluation) {
    return <div>No se encontró la plantilla de evaluación.</div>
  }

  const navigateToMenu = () => {
    navigate('/plantillas-evaluacion')
  }

  const navigateToEdit = () => {
    navigate(`/plantillas-evaluacion/editar/${evaluationId}`)
  }

  return (
    <div className=' space-y-6'>
      <TitlePageComponent
        title='Ver plantilla de evaluación'
        description={`Aquí podrás ver el detalle de la plantilla`}
      />

      <div className='bg-white shadow sm:rounded-lg px-4 py-5 sm:p-6'>
        <h2 className='text-md font-semibold mb-2 text-gray-800'>
          {evaluation.title}
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
          <div>
            <span className=' text-sm text-gray-900'>Creada por:</span>{' '}
            {evaluation.createdBy}
          </div>
          <div>
            <span className='text-sm text-gray-900'>Creado el:</span>{' '}
            {formatDate(evaluation.createdAt)}
          </div>
          <div>
            <span className='text-sm text-gray-900'>Última actualización:</span>{' '}
            {formatDate(evaluation.updatedAt)}
          </div>
        </div>
      </div>

      {/* Mostrar categorías y preguntas */}
      {evaluation.categories.map((category, categoryIndex) => (
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

      {/* Mostrar feedbacks si existen */}
      {evaluation.feedback && (
        <div className='bg-white shadow sm:rounded-lg px-4 py-5 sm:p-6'>
          <h3 className='text-md font-semibold mb-2 text-gray-800'>
            Feedbacks
          </h3>
          {evaluation.feedback.length > 0 ? (
            <div>
              <ul className='list-disc list-inside'>
                {evaluation.feedback.map(feedback => (
                  <li key={feedback._id} className='text-gray-700'>
                    {feedback.comment}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className='text-gray-500'>No hay feedbacks disponibles.</p>
          )}
        </div>
      )}

      {/* Botones de Cancelar y Crear Plantilla */}
      <div className='flex justify-end gap-6'>
        <ButtonComponent
          onClick={navigateToMenu}
          icon={MdBackspace}
          label={'Regresar'}
          variant={ButtonStyle.Cancel}
        />
        <ButtonComponent
          onClick={navigateToEdit}
          icon={BiEdit}
          label={'Editar'}
          variant={ButtonStyle.Fill}
        />
      </div>
    </div>
  )
}
