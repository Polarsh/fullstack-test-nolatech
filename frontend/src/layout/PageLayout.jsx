import { useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Sidebar from './Sidebar'
import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'

export default function PageLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const openSideBar = () => {
    setSidebarOpen(true)
  }

  const closeSideBar = () => {
    setSidebarOpen(false)
  }

  return (
    <div>
      {/* mobile */}
      <Dialog
        open={sidebarOpen}
        onClose={setSidebarOpen}
        className='relative z-50 lg:hidden'>
        <DialogBackdrop
          transition
          className='fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0'
        />

        <div className='fixed inset-0 flex'>
          <DialogPanel
            transition
            className='relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full'>
            <TransitionChild>
              <div className='absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0'>
                <button
                  type='button'
                  onClick={() => setSidebarOpen(false)}
                  className='-m-2.5 p-2.5'>
                  <span className='sr-only'>Cerrar menú</span>
                  <XMarkIcon
                    aria-hidden='true'
                    className='h-6 w-6 text-white'
                  />
                </button>
              </div>
            </TransitionChild>
            {/* Sidebar */}
            <Sidebar closeSideBar={closeSideBar} />
          </DialogPanel>
        </div>
      </Dialog>

      {/* desktop */}
      <div className='hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col'>
        {/* Siedbar */}
        <Sidebar closeSideBar={closeSideBar} />
      </div>

      <div className='lg:pl-72'>
        <NavBar openSideBar={openSideBar} />

        <main className='py-10'>
          <div className='px-4 sm:px-6 lg:px-8'>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
