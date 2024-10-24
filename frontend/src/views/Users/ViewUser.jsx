import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { BiChart } from 'react-icons/bi'
import { PaperAirplaneIcon } from '@heroicons/react/20/solid'
import { MdBackspace } from 'react-icons/md'

import ButtonComponent, { ButtonStyle } from '../../shared/components/Button'
import TitlePageComponent from '../../shared/components/TitlePage'

import { useEvaluation } from '../../context/EvaluationContext'
import { useUsers } from '../../context/UserContext'
import { formatDate } from '../../utils/formatDate'
import UserDetailCard from './UserDetailCard'

export default function ViewUserPage() {
  const { employeeId } = useParams()
  const navigate = useNavigate()

  const { user, fetchUserById, loading: userLoading } = useUsers()

  const {
    evaluations,
    fetchEvaluationsByEmployeeId,
    loading: evaluationLoading,
  } = useEvaluation()

  useEffect(() => {
    if (employeeId) {
      fetchUserById(employeeId)
      fetchEvaluationsByEmployeeId(employeeId)
    }
  }, [])

  if (userLoading || evaluationLoading) {
    return <div>Loading...</div>
  }

  const navigateToMenu = () => {
    navigate('/trabajadores')
  }

  const navigateToAssign = () => {
    navigate(`/asignar/${employeeId}`)
  }

  const navigateToViewReport = () => {
    navigate(`/trabajadores/reporte/${employeeId}`)
  }

  return (
    <div className=' space-y-6'>
      <TitlePageComponent
        title='Ver detalle del empleado'
        description={`Aquí podrás ver el detalle empleado`}
      />

      <UserDetailCard user={user} userLoading={userLoading} />

      <TitlePageComponent
        title='Evaluaciones asignadas'
        description={`Aquí podrás ver el detalle empleado`}
      />

      {/* Lista de gastos */}
      <ul className='space-y-4'>
        {evaluations.length === 0 ? (
          <div className='bg-white shadow sm:rounded-lg px-4 py-5 sm:p-6'>
            <p className='text-gray-500'>
              No se encontraron evaluaciones asignadas.
            </p>
          </div>
        ) : (
          evaluations.map((evaluation, index) => (
            <li key={index}>
              <EvaluationAssignedCard
                evaluation={evaluation}
                navigateToViewReport={navigateToViewReport}
              />
            </li>
          ))
        )}
      </ul>

      {/* Botones de Cancelar y Crear Plantilla */}
      <div className='flex justify-end gap-6'>
        <ButtonComponent
          onClick={navigateToMenu}
          icon={MdBackspace}
          label={'Regresar'}
          variant={ButtonStyle.Cancel}
        />
        <ButtonComponent
          onClick={navigateToViewReport}
          icon={BiChart}
          label={'Ver reporte'}
          variant={ButtonStyle.Outline}
        />
        <ButtonComponent
          onClick={navigateToAssign}
          icon={PaperAirplaneIcon}
          label={'Evaluar'}
          variant={ButtonStyle.Fill}
        />
      </div>
    </div>
  )
}

const EvaluationAssignedCard = ({ evaluation }) => {
  const completedCount = evaluation?.evaluations?.filter(
    evaluation => evaluation.completed === true
  ).length

  const total = evaluation?.evaluations?.length

  const isCompleted = completedCount === total

  return (
    <div className='bg-white shadow sm:rounded-lg px-4 py-5 sm:p-6'>
      <div className=' flex justify-between'>
        {/* Titutlo */}
        <h3 className='text-md font-semibold text-gray-800 pb-5'>
          {evaluation.title}
        </h3>
        {/* Estado */}
        <div>
          {isCompleted ? (
            <span className='text-sm font-semibold text-primary'>
              Completado {`${completedCount} / ${total}`}
            </span>
          ) : (
            <span className='text-sm font-semibold text-my-red'>
              Incompleto {`${completedCount} / ${total}`}
            </span>
          )}
        </div>
      </div>
      <div className=' flex justify-between flex-col sm:flex-row'>
        {/* Texto izquierdo */}
        <div className='space-y-2'>
          <span className='text-sm font-semibold text-gray-600'>Asignado:</span>{' '}
          <span className='text-gray-700'>
            {formatDate(evaluation.assignedAt)}
          </span>
        </div>
      </div>
    </div>
  )
}
