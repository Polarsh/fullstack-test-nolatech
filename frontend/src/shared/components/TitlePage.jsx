export default function TitlePageComponent({ title, description }) {
  return (
    <div className='sm:flex sm:items-center'>
      <div className='sm:flex-auto'>
        <h1 className='text-xl font-semibold leading-6 text-gray-900'>
          {title}
        </h1>
        <p className='mt-2 text-md text-gray-700'>{description}</p>
      </div>
    </div>
  )
}
