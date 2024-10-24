import { useUsers } from '../../context/UserContext'
import { Link } from 'react-router-dom'

import { UserCircleIcon } from '@heroicons/react/24/outline'

import DoughnutChart from '../../shared/charts/DoughnutChart'

export default function AdminDashboard() {
  const { users, loading } = useUsers()

  if (loading) {
    return <>Cargando</>
  }

  if (!users) {
    return <>Hubo una falla al cargar los datos. Intente nuevamente</>
  }

  return (
    <div className='bg-white shadow sm:rounded-lg px-4 py-5 sm:p-6'>
      <h1 className='text-2xl font-semibold text-gray-800 mb-6'>
        Panel de Administrador
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Sección de administración de usuarios */}
        <div className='bg-green-50 bg-opacity-50 p-4 shadow rounded-lg'>
          <h2 className='text-lg font-semibold text-gray-800'>
            Gestión de Usuarios
          </h2>
          <p>Ver y administrar usuarios registrados en el sistema.</p>
          <UserRoleGraph users={users} />
        </div>
        {/*  */}
        <div className='bg-green-50 bg-opacity-50 p-6 shadow-md rounded-lg'>
          <h2 className='text-lg font-semibold text-gray-800 mb-4'>
            Últimos 5 trabajadores registrados
          </h2>
          <ul className='space-y-4'>
            {users.slice(-5).map(user => (
              <li
                key={user.email}
                className='relative flex items-center space-x-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200'>
                <div className='flex-shrink-0'>
                  <UserCircleIcon className='h-12 w-12 text-gray-400' />
                </div>
                <div className='min-w-0 flex-1'>
                  <Link
                    to={`/trabajadores/ver/${user._id}`}
                    className='focus:outline-none'>
                    <span aria-hidden='true' className='absolute inset-0' />
                    <p className='text-base font-semibold text-gray-900'>
                      {user.name}
                    </p>
                    <p className='text-sm text-gray-600'>{user.role}</p>
                  </Link>
                </div>
                <div className='text-gray-500'>
                  <p className='text-sm'>{user.email}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

const UserRoleGraph = ({ users }) => {
  const userRoleData = userList => {
    const adminCount = userList.filter(user => user.role === 'Admin').length

    const managerCount = userList.filter(user => user.role === 'Manager').length

    const employeeCount = userList.filter(
      user => user.role === 'Employee'
    ).length

    const data = {
      labels: ['Administradores', 'Managers', 'Empleados'],
      datasets: [
        {
          label: 'Cantidad de trabajadores',
          data: [adminCount, managerCount, employeeCount],
          backgroundColor: [
            'rgba(75, 192, 192, 0.6)', // Verde azulado
            'rgba(255, 159, 64, 0.6)', // Naranja
            'rgba(153, 102, 255, 0.6)', // Púrpura
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)', // Verde azulado
            'rgba(255, 159, 64, 1)', // Naranja
            'rgba(153, 102, 255, 1)', // Púrpura
          ],
          borderWidth: 1,
        },
      ],
    }

    return data
  }

  return (
    <DoughnutChart
      data={userRoleData(users)}
      title={'Promedios de Evaluación'}
    />
  )
}
