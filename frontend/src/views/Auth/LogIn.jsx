import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useAuth } from '../../context/AuthContext'

import { logInSchema } from '../../modules/auth/schemas/logInSchema'
import LogoComponent from '../../shared/components/Logo'
import { useNavigate } from 'react-router-dom'
import LoadingModal from '../../shared/components/LoadingModal'

export default function LogInView() {
  const { login, loading } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: 'admin@dybsm98.com', password: 'nolatech' },
    resolver: yupResolver(logInSchema),
  })

  const onSubmit = async data => {
    try {
      await login(data.email, data.password)

      navigate('/')
    } catch (error) {
      console.error('Error al iniciar sesión:', error)
    }
  }

  return (
    <>
      <div className='flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <LogoComponent />
          <h2 className='mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Inicia sesión con tu cuenta
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]'>
          <div className='bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12'>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium leading-6 text-gray-900'>
                  Email
                </label>
                <div className='mt-2'>
                  <input
                    id='email'
                    name='email'
                    type='email'
                    autoComplete='email'
                    {...register('email')}
                    className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                      errors.email ? 'ring-red-500' : 'ring-gray-300'
                    } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6`}
                  />
                  {errors.email && (
                    <p className='text-sm text-red-600 mt-2'>
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium leading-6 text-gray-900'>
                  Contraseña
                </label>
                <div className='mt-2'>
                  <input
                    id='password'
                    name='password'
                    type='password'
                    autoComplete='current-password'
                    {...register('password')}
                    className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                      errors.password ? 'ring-red-500' : 'ring-gray-300'
                    } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6`}
                  />
                  {errors.password && (
                    <p className='text-sm text-red-600 mt-2'>
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type='submit'
                  className='flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'>
                  Iniciar sesión
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {loading && <LoadingModal title={'Iniciando sesión'} />}
    </>
  )
}
