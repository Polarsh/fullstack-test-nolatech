import { useUsers } from '../../context/UserContext'
import { PlusCircleIcon } from '@heroicons/react/20/solid'
import { useNavigate } from 'react-router-dom'

import Table from '../../shared/components/Table/Table'
import ButtonComponent, { ButtonStyle } from '../../shared/components/Button'
import TitlePageComponent from '../../shared/components/TitlePage'

export default function UserMenuPage() {
  const { users, loading } = useUsers()

  const navigate = useNavigate()

  const columns = [
    { header: 'Nombre', accessorKey: 'name' },
    { header: 'Email', accessorKey: 'email' },
    { header: 'Departamento', accessorKey: 'department' },
    { header: 'Posición', accessorKey: 'position' },
    { header: 'Rol', accessorKey: 'role' },
  ]

  const actionItems = []

  if (loading) {
    return <>Cargando</>
  }

  const handleNewUser = () => {
    navigate('/trabajadores/nuevo')
  }

  return (
    <div className=' space-y-6'>
      <TitlePageComponent
        title='Trabajadores'
        description='Una lista de todos los trabajadores, con su nombre, correo electrónico y rol.'
      />
      <Table data={users} columns={columns}>
        <Table.Header>
          <ButtonComponent
            onClick={handleNewUser}
            label={'Añadir usuario'}
            icon={PlusCircleIcon}
            variant={ButtonStyle.Fill}
          />
        </Table.Header>
        <Table.Body actionItems={actionItems} onActionClick={() => {}} />
      </Table>
    </div>
  )
}
