import { Link, useLocation } from 'react-router-dom'
import { navigation } from '../routes/Routes'
import LogoComponent from '../shared/components/Logo'
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Sidebar({ closeSideBar }) {
  const location = useLocation()

  return (
    <div className='flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-950 bg-bg-dark px-6'>
      <div className='flex h-16 shrink-0 items-center'>
        <LogoComponent />
      </div>
      <nav className='flex flex-1 flex-col'>
        <ul role='list' className='flex flex-1 flex-col gap-y-7'>
          <li>
            <ul role='list' className='-mx-2 space-y-1'>
              {navigation.map(item => {
                const current = location.pathname === item.href
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      onClick={() => closeSideBar()}
                      className={classNames(
                        current
                          ? ' bg-bg-light bg-opacity-10 text-primary'
                          : 'text-gray-400 hover:bg-bg-light hover:bg-opacity-5 hover:text-primary',
                        'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                      )}>
                      <item.icon
                        aria-hidden='true'
                        className={classNames(
                          current
                            ? 'text-primary'
                            : 'text-gray-400 group-hover:text-primary',
                          'h-6 w-6 shrink-0'
                        )}
                      />
                      {item.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </li>
        </ul>
      </nav>
      {/* Cerrar sesión */}
      <div className='-mx-2 pb-4'>
        <Link
          to={'/cerrar-sesion'}
          onClick={() => closeSideBar()}
          className={classNames(
            'text-gray-400 hover:bg-bg-light hover:bg-opacity-5 hover:text-primary group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
          )}>
          <ArrowLeftStartOnRectangleIcon
            aria-hidden='true'
            className='text-gray-400 group-hover:text-primary h-6 w-6 shrink-0'
          />
          Cerrar sesión
        </Link>
      </div>
    </div>
  )
}
