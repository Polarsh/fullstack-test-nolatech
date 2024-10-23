import { useNavigate, useParams } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { MdCancel } from 'react-icons/md'
import {
  InformationCircleIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/20/solid'

/* import { yupResolver } from '@hookform/resolvers/yup'
 */

import { useEvaluation } from '../../context/EvaluationContext'
import { useUsers } from '../../context/UserContext'

import ButtonComponent, { ButtonStyle } from '../../shared/components/Button'
import TitlePageComponent from '../../shared/components/TitlePage'
import SelectComponent from '../../shared/components/Select'
import LoadingModal from '../../shared/components/LoadingModal'
import UserDetailCard from './UserDetailCard'
import { assignEvaluationSchema } from '../../modules/evaluationTemplate/schemas/assignEvaluationSchema'

export default function AsignEvaluationPage() {
  const { employeeId } = useParams()
  const navigate = useNavigate()

  const {
    evaluations,
    fetchEvaluationTemplates,
    assignEvalutionToEmployee,
    loading: evaluationLoading,
  } = useEvaluation()
  const { user, users, fetchUserById, loading: userLoading } = useUsers()

  useEffect(() => {
    if (employeeId) {
      fetchUserById(employeeId)
      fetchEvaluationTemplates()
    }
  }, [])

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      employeeId,
      evaluationId: '',
    },
    resolver: yupResolver(assignEvaluationSchema),
  })

  const navigateToMenu = () => {
    navigate('/trabajadores')
  }

  const onSubmit = async data => {
    try {
      const usersIds = users.map(user => user._id)

      const formattedData = {
        evaluateeId: data.employeeId,
        evaluationTemplateId: data.evaluationId,
        evaluatorIds: usersIds,
      }

      await assignEvalutionToEmployee(formattedData)

      navigate('/trabajadores')
    } catch (error) {
      console.log(error)
    }
  }

  if (evaluationLoading || userLoading) {
    return <>Cargando</>
  }

  return (
    <div className='space-y-6'>
      <TitlePageComponent title='Ver detalle del empleado' />

      <UserDetailCard user={user} userLoading={userLoading} />

      <div className='border-b border-gray-200 bg-white px-4 py-5 sm:px-6'>
        <h3 className='text-base font-semibold leading-6 text-gray-900 mb-6'>
          Asignar Evaluación
        </h3>

        <form className=' space-y-6' onSubmit={handleSubmit(onSubmit)}>
          <div className='grid grid-cols-2 gap-6'>
            {/* Evaluación */}
            <SelectComponent
              label='Evaluación'
              options={evaluations.map(evaluation => ({
                value: evaluation._id,
                label: evaluation.title,
              }))}
              isSearchable={false}
              value={watch('evaluationId')}
              onChange={option => setValue('evaluationId', option)}
              error={errors.evaluationId}
            />
          </div>

          <div className='rounded-md bg-my-blue bg-opacity-30 p-4'>
            <div className='flex'>
              <InformationCircleIcon
                aria-hidden='true'
                className='h-5 w-5 text-blue-400'
              />
              <p className='ml-3 flex-1 md:flex md:justify-between text-sm text-blue-700'>
                Todos los empleados recibirán la solicitud para responder y
                evaluar al empleado asignado.
              </p>
            </div>
          </div>

          <div className='flex justify-end gap-4'>
            <ButtonComponent
              onClick={navigateToMenu}
              icon={MdCancel}
              label={'Cancelar'}
              variant={ButtonStyle.Cancel}
            />
            <ButtonComponent
              isSubmit={true}
              icon={PaperAirplaneIcon}
              label={'Asignar'}
              variant={ButtonStyle.Fill}
            />
          </div>
        </form>
      </div>

      {(evaluationLoading || userLoading) && (
        <LoadingModal title={'Cargando. Por favor espere'} />
      )}
    </div>
  )
}
