import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { CgSpinner } from 'react-icons/cg'

export default function LoadingModal({ title }) {
  return (
    <Dialog open={true} onClose={() => {}} className='relative z-50'>
      <DialogBackdrop
        transition
        className='fixed inset-0 bg-black bg-opacity-50 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in'
      />

      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center p-4 text-center sm:p-0'>
          <DialogPanel
            transition
            className='relative transform overflow-hidden rounded-2xl bg-white px-6 py-6 text-center shadow-2xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-md'>
            <div>
              <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full border-primary bg-primary bg-opacity-10'>
                <CgSpinner
                  aria-hidden='true'
                  className='h-8 w-8 animate-spin text-primary'
                />
              </div>
              <div className='mt-4'>
                <h3 className='text-lg font-semibold leading-7 text-gray-900'>
                  {title || 'Cargando...'}
                </h3>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
