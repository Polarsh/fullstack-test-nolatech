import { useEffect } from 'react'
import { useEvaluation } from '../../context/EvaluationContext'

import { BiChart } from 'react-icons/bi'

import ButtonComponent, { ButtonStyle } from '../../shared/components/Button'
import TitlePageComponent from '../../shared/components/TitlePage'

import { formatDate } from '../../utils/formatDate'
import { useAuth } from '../../context/AuthContext'
import { ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'

export default function PendingEvaluationsPage() {
  const navigate = useNavigate()

  const { user } = useAuth()

  const { evaluations, fetchEvaluationsByEvaluatorId, loading } =
    useEvaluation()

  useEffect(() => {
    if (user) {
      fetchEvaluationsByEvaluatorId(user.employeeId)
    }
  }, [])

  if (loading) {
    return <div>Cargando evaluaciones pendientes...</div>
  }
  const navigateToEvaluate = evaluation => {
    navigate(`/evaluaciones/evaluacion/${evaluation._id}`)
  }

  const navigateToFeedback = evaluation => {
    navigate(`/evaluaciones/feedback/${evaluation._id}`)
  }

  return (
    <div className=' space-y-6'>
      <TitlePageComponent
        title='Mis evaluaciones'
        description={`Aquí podrás ver el detalle empleado`}
      />

      {/* Lista de gastos */}
      <ul className='space-y-4'>
        {evaluations.length === 0 ? (
          <div className='bg-white shadow sm:rounded-lg px-4 py-5 sm:p-6'>
            <p className='text-gray-500'>
              No se encontraron evaluaciones. Todavia no se te asignó ninguna
              evaluación
            </p>
          </div>
        ) : (
          evaluations.map((evaluation, index) => (
            <li key={index}>
              <EvaluationCard
                evaluation={evaluation}
                navigateToFeedback={navigateToFeedback}
                navigateToEvaluate={navigateToEvaluate}
              />
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

const EvaluationCard = ({
  evaluation,
  navigateToFeedback,
  navigateToEvaluate,
}) => {
  return (
    <div className='bg-white shadow sm:rounded-lg px-4 py-5 sm:p-6'>
      <div className=' flex justify-between'>
        {/* Titutlo */}
        <h3 className='text-md font-semibold text-gray-800 pb-5'>
          {evaluation.evaluateeId?.name}
        </h3>
        {/* Estado */}
        <div>
          {evaluation.completed ? (
            <span className='text-sm font-semibold text-primary'>
              Completado
            </span>
          ) : (
            <span className='text-sm font-semibold text-my-red'>Pendiente</span>
          )}
        </div>
      </div>
      <div className=' flex justify-between flex-col sm:flex-row'>
        {/* Texto izquierdo */}
        <div className='space-y-2'>
          <div>
            <span className='text-sm font-semibold text-gray-600'>
              Asignado:
            </span>{' '}
            <span className='text-gray-700'>
              {formatDate(evaluation.assignedAt)}
            </span>
          </div>
          <div>
            <span className='text-sm font-semibold text-gray-600'>
              Evaluación:
            </span>{' '}
            <span className='text-gray-700'>
              {evaluation.evaluationTemplateId?.title}
            </span>
          </div>
        </div>
        {/* Botones */}
        <div className=' flex gap-4 justify-end pt-4 sm:pt-0'>
          {evaluation.completed ? (
            <div className=' content-end'>
              <ButtonComponent
                onClick={() => {
                  navigateToFeedback(evaluation)
                }}
                icon={BiChart}
                label={'Dar Feedback'}
                variant={ButtonStyle.Outline}
              />
            </div>
          ) : (
            <div className=' content-end'>
              <ButtonComponent
                onClick={() => {
                  navigateToEvaluate(evaluation)
                }}
                icon={ClipboardDocumentCheckIcon}
                label={'Evaluar'}
                variant={ButtonStyle.Outline}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
