export default function UserDetailCard({ user, userLoading }) {
  if (userLoading) {
    return (
      <div className='bg-white shadow sm:rounded-lg px-4 py-5 sm:p-6'>
        <p className='text-gray-500'>Cargando información del usuario...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className='bg-white shadow sm:rounded-lg px-4 py-5 sm:p-6'>
        <p className='text-gray-500'>
          Hubo un error al cargar la información del usuario.
        </p>
      </div>
    )
  }

  return (
    <div className='bg-white shadow rounded p-6 space-y-4'>
      {/* Título: Nombre del usuario */}
      <h2 className='text-lg font-bold text-gray-800'>Nombre: {user.name}</h2>

      {/* Información del usuario dispuesta en dos columnas */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
        {/* Primera columna: Rol y Email */}
        <div className='space-y-2'>
          <div>
            <span className='text-sm font-semibold text-gray-600'>Rol:</span>{' '}
            <span className='text-gray-700'>{user.role}</span>
          </div>
          <div>
            <span className='text-sm font-semibold text-gray-600'>Email:</span>{' '}
            <span className='text-gray-700'>{user.email}</span>
          </div>
        </div>

        {/* Segunda columna: Departamento y Posición */}
        <div className='space-y-2'>
          <div>
            <span className='text-sm font-semibold text-gray-600'>
              Departamento:
            </span>{' '}
            <span className='text-gray-700'>{user.department}</span>
          </div>
          <div>
            <span className='text-sm font-semibold text-gray-600'>
              Posición:
            </span>{' '}
            <span className='text-gray-700'>{user.position}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
