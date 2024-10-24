import {
  ClipboardDocumentCheckIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'
import { useEffect } from 'react'

import { useAuth } from '../../context/AuthContext'
import { useEvaluation } from '../../context/EvaluationContext'
import { formatDate } from '../../utils/formatDate'
import ButtonComponent, { ButtonStyle } from '../../shared/components/Button'
import { useNavigate } from 'react-router-dom'

export default function EmployeeDashboard() {
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

  const pendingEvaluations = evaluations.filter(
    evaluation => !evaluation.completed
  )

  const navigateToEvaluations = () => {
    navigate('/evaluaciones')
  }

  return (
    <div className='space-y-6'>
      <h1 className='text-3xl font-bold text-gray-800'>Panel de Empleado</h1>

      <div className='bg-white p-6 shadow-md rounded-lg'>
        <div className=' flex justify-end'>
          <div>
            <h2 className='text-xl font-semibold text-gray-800 mb-4'>
              Evaluaciones Pendientes
            </h2>
            <p className='text-gray-700 mb-6'>
              A continuación se listan las evaluaciones que tienes pendientes de
              completar.
            </p>
          </div>

          <div>
            <ButtonComponent
              onClick={navigateToEvaluations}
              icon={ClipboardDocumentCheckIcon}
              label={'Ir a las evaluaciones'}
              variant={ButtonStyle.Outline}
            />
          </div>
        </div>

        {pendingEvaluations.length > 0 ? (
          <ul className='space-y-4'>
            {pendingEvaluations.slice(0, 5).map(evaluation => (
              <li
                key={evaluation._id}
                className='flex items-center space-x-4 p-4 bg-green-50 bg-opacity-50 border border-gray-300 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200'>
                <UserCircleIcon className='h-12 w-12 text-green-500' />
                <div className='flex-1'>
                  <p className='text-lg font-semibold text-gray-900'>
                    Evaluar a: {evaluation.evaluateeId?.name}
                  </p>
                  <p className='text-sm text-gray-600'>
                    Asignado el: {formatDate(evaluation.assignedAt)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className='text-center text-gray-500'>
            No tienes evaluaciones pendientes por completar. ¡Buen trabajo!
          </div>
        )}
      </div>
    </div>
  )
}
