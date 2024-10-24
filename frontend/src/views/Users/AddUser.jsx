import { useNavigate } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { BiSave } from 'react-icons/bi'
import { MdCancel } from 'react-icons/md'

import TitlePageComponent from '../../shared/components/TitlePage'
import InputComponent from '../../shared/components/Input'

import { useUsers } from '../../context/UserContext'

import { registerUserSchema } from '../../modules/users/schemas/registerUserSchema'
import ButtonComponent, { ButtonStyle } from '../../shared/components/Button'
import LoadingModal from '../../shared/components/LoadingModal'
import SelectComponent from '../../shared/components/Select'

import roles from '../../../db/roles.json'
import positions from '../../../db/positions.json'
import departments from '../../../db/departments.json'

const initialData = {
  name: '',
  email: '',
  role: '',
  phone: 0,
  position: '',
  department: '',
}

export default function AddUserPage() {
  const { createUser, loading } = useUsers()
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: initialData,
    resolver: yupResolver(registerUserSchema),
  })

  const onSubmit = async data => {
    try {
      const formattedData = {
        name: data.name,
        email: data.email,
        role: data.role,
        phone: data.phone,
        position: data.position,
        department: data.department,
      }

      await createUser(formattedData)

      navigate('/trabajadores')
    } catch (error) {}
  }

  return (
    <div className='bg-white shadow sm:rounded-lg px-4 py-5 sm:p-6`'>
      <TitlePageComponent
        title='Añadir trabajador'
        description='Aqui podrás crear un nuevo trabajador'
      />
      <form className=' mt-6 space-y-6' onSubmit={handleSubmit(onSubmit)}>
        <div className='grid grid-cols-2 gap-6'>
          <Controller
            name='name'
            control={control}
            render={({ field }) => (
              <InputComponent
                {...field}
                label='Nombre'
                placeholder='Ej. John doe'
                errors={errors.name}
              />
            )}
          />

          {/* email */}
          <Controller
            name='email'
            control={control}
            render={({ field }) => (
              <InputComponent
                {...field}
                label='Email'
                placeholder='john.doe@example.com'
                errors={errors.email}
              />
            )}
          />

          {/* phone */}
          <Controller
            name='phone'
            control={control}
            render={({ field }) => (
              <InputComponent
                {...field}
                label='Teléfono'
                placeholder='987654321'
                errors={errors.phone}
              />
            )}
          />

          {/* Role */}
          <SelectComponent
            label='Rol'
            options={roles.map(role => ({
              value: role,
              label: role,
            }))}
            isSearchable={false}
            value={watch('role')}
            onChange={option => setValue('role', option)}
            error={errors.role}
          />

          {/* Área - department */}
          <SelectComponent
            label='Área'
            options={departments.map(department => ({
              value: department,
              label: department,
            }))}
            isSearchable={false}
            value={watch('department')}
            onChange={option => setValue('department', option)}
            error={errors.department}
          />

          {/* Posición */}
          <SelectComponent
            label='Posición'
            options={positions.map(position => ({
              value: position,
              label: position,
            }))}
            isSearchable={false}
            value={watch('position')}
            onChange={option => setValue('position', option)}
            error={errors.position}
          />
        </div>

        <div className='flex justify-end gap-4'>
          <ButtonComponent
            onClick={() => {
              navigate('/trabajadores')
            }}
            icon={MdCancel}
            label={'Cancelar'}
            variant={ButtonStyle.Cancel}
          />
          <ButtonComponent
            isSubmit={true}
            icon={BiSave}
            label={'Añadir'}
            variant={ButtonStyle.Fill}
          />
        </div>
      </form>
      {loading && <LoadingModal title={'Creando usuario. Por favor espere'} />}
    </div>
  )
}
