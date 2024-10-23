import { useNavigate } from 'react-router-dom'
import { useEvaluation } from '../../context/EvaluationContext'
import TitlePageComponent from '../../shared/components/TitlePage'
import Table from '../../shared/components/Table/Table'
import ButtonComponent, { ButtonStyle } from '../../shared/components/Button'
import {
  EyeIcon,
  PencilSquareIcon,
  PlusCircleIcon,
} from '@heroicons/react/20/solid'

export default function EvaluationMenuPage() {
  const { evaluations, loading } = useEvaluation()

  const navigate = useNavigate()

  const columns = [
    { header: 'Creador por', accessorKey: 'createdBy' },
    { header: 'Título', accessorKey: 'title' },
    {
      header: 'N° de feedbacks',
      accessorFn: row => row.feedback.length,
    },
    {
      header: 'N° de categorias',
      accessorFn: row => row.categories.length,
    },
  ]

  const navigateToView = evaluation => {
    navigate(`/plantillas-evaluacion/ver/${evaluation._id}`)
  }

  const navigateToEdit = evaluation => {
    navigate(`/plantillas-evaluacion/editar/${evaluation._id}`)
  }

  const navigateToAdd = () => {
    navigate('/plantillas-evaluacion/nuevo')
  }

  const actionItems = [
    {
      label: 'Ver detalle',
      icon: EyeIcon,
      action: navigateToView,
    },
    {
      label: 'Editar',
      icon: PencilSquareIcon,
      action: navigateToEdit,
    },
  ]

  if (loading) {
    return <>Cargando...</>
  }

  return (
    <div className=' space-y-6'>
      <TitlePageComponent
        title='Plantillas de evaluación'
        description='Una lista de todos las plantillas de evaluación'
      />
      <Table data={evaluations} columns={columns}>
        <Table.Header>
          <ButtonComponent
            onClick={navigateToAdd}
            label={'Añadir plantilla de evaluación'}
            icon={PlusCircleIcon}
            variant={ButtonStyle.Fill}
          />
        </Table.Header>
        <Table.Body actionItems={actionItems} />
      </Table>
    </div>
  )
}
