import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, UserCircleIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const userNavigation = [
  { name: 'Mi Cuenta', href: '/' },
  { name: 'Cerrar sesión', href: '/cerrar-sesion' },
]

export default function NavBar({ openSideBar }) {
  const { user } = useAuth()

  return (
    <div>
      <div className='sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8'>
        <button
          type='button'
          onClick={() => openSideBar()}
          className='-m-2.5 p-2.5 text-gray-700 lg:hidden'>
          <span className='sr-only'>Abrir menú</span>
          <Bars3Icon aria-hidden='true' className='h-6 w-6' />
        </button>

        {/* Separator */}
        <div aria-hidden='true' className='h-6 w-px bg-gray-200 lg:hidden' />

        <div className='flex flex-1 gap-x-4 self-stretch lg:gap-x-6'>
          <div className='relative flex flex-1 items-center'>
            <strong>Evaluación 360</strong>
          </div>
          <div className='flex items-center gap-x-4 lg:gap-x-6'>
            {/* Profile dropdown */}
            <Menu as='div' className='relative'>
              <MenuButton className='-m-1.5 flex items-center p-1.5'>
                <span className='sr-only'>Abrir menú de usuario</span>
                <UserCircleIcon className='h-8 w-8 rounded-full bg-gray-50' />
                <span className='hidden lg:flex lg:items-center'>
                  <span
                    aria-hidden='true'
                    className='ml-4 text-sm font-semibold leading-6 text-gray-900'>
                    {user ? user.email : 'Email error'}
                  </span>
                  <ChevronDownIcon
                    aria-hidden='true'
                    className='ml-2 h-5 w-5 text-gray-400'
                  />
                </span>
              </MenuButton>
              <MenuItems
                transition
                className='absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in'>
                {userNavigation.map(item => (
                  <MenuItem key={item.name}>
                    <Link
                      to={item.href}
                      className='block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50'>
                      {item.name}
                    </Link>
                  </MenuItem>
                ))}
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  )
}
