import { UserCircleIcon } from '@heroicons/react/24/outline'

import DoughnutChart from '../../shared/charts/DoughnutChart'
import { useEvaluation } from '../../context/EvaluationContext'
import { useEffect } from 'react'
import { formatDate } from '../../utils/formatDate'

export default function ManagerDashboard() {
  const { evaluations, getAllAssignedEvaluations, loading } = useEvaluation()

  useEffect(() => {
    getAllAssignedEvaluations()
  }, [])

  if (loading) {
    return <>Cargando</>
  }

  if (!evaluations) {
    return <>Hubo una falla al cargar los datos. Intente nuevamente</>
  }

  const pendingEvaluations = evaluations.filter(
    evaluation => !evaluation.completed
  )

  return (
    <div className=''>
      <h1 className='text-2xl font-semibold text-gray-800 mb-6'>
        Panel de Manager
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Sección de administración de usuarios */}
        <div className='bg-white p-4 shadow rounded-lg'>
          <h2 className='text-lg font-semibold text-gray-800'>
            Gestión de Evaluaciones
          </h2>
          <p>Ver y administrar las evaluaciones asignadas.</p>
          <EvaluationAssignedGraph evaluations={evaluations} />
        </div>
        {/*  */}
        <div className='bg-white p-6 shadow-md rounded-lg'>
          <h2 className='text-lg font-bold text-gray-800 mb-4'>
            Evaluaciones Pendientes
          </h2>
          <p className='text-gray-700 mb-4'>
            Tienes personal que aún no ha completado sus evaluaciones.
          </p>

          {pendingEvaluations.length > 0 ? (
            <ul className='space-y-4'>
              {pendingEvaluations.slice(-5).map(evaluation => (
                <li
                  key={evaluation._id}
                  className='relative flex items-center space-x-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200'>
                  <div className='flex-shrink-0'>
                    <UserCircleIcon className='h-12 w-12 text-green-500' />
                  </div>
                  <div className='min-w-0 flex-1'>
                    <span aria-hidden='true' className='absolute inset-0' />
                    <p className='text-base font-semibold text-gray-900'>
                      {evaluation.evaluatorId?.name}
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
              Los trabajadores estan al día con las evaluaciones.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const EvaluationAssignedGraph = ({ evaluations }) => {
  const evaluationsData = userList => {
    const completedCount = userList.filter(
      evaluation => evaluation.completed
    ).length

    const pendingCount = userList.filter(
      evaluation => !evaluation.completed
    ).length

    const data = {
      labels: ['Completados', 'Pendientes'],
      datasets: [
        {
          label: 'Estado de las evaluaciones',
          data: [completedCount, pendingCount],
          backgroundColor: [
            'rgba(75, 192, 192, 0.6)', // Verde para completados
            'rgba(255, 99, 132, 0.6)', // Rojo para pendientes
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)', // Verde más fuerte para completados
            'rgba(255, 99, 132, 1)', // Rojo más fuerte para pendientes
          ],
          borderWidth: 1,
        },
      ],
    }

    return data
  }

  return (
    <DoughnutChart
      data={evaluationsData(evaluations)}
      title={'Promedios de Evaluación'}
    />
  )
}
