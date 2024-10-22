import { FaCheck } from 'react-icons/fa' // Importa el icono FaCheck
import Select, { components } from 'react-select'

const primary = '#32CD32'

// Estilos personalizados usando Tailwind CSS
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
    borderColor: state.isFocused ? primary : '#D1D5DB', // Verde cuando está enfocado, gris cuando no
    borderRadius: '0.375rem', // Bordes redondeados
    borderWidth: state.isFocused ? '2px' : '1px', // Simula el aumento de borde hacia adentro cuando está enfocado
    padding: '1px',
    boxShadow: 'none',
    outline: 'none', // Elimina el borde azul por defecto al enfocar
    '&:hover': {
      borderColor: 'none', // Borde verde en hover
    },
    transition: 'border-color 0.2s ease', // Transición suave entre el color de borde
    fontSize: '0.875rem', // sm:text-sm
    color: '#111827', // Texto gris oscuro
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused
      ? primary // si está enfocado
      : 'white',
    color: '#111827', // gray-900
    fontWeight: state.isSelected ? 'bold' : 'normal', // Texto en negrita si está seleccionada

    display: 'flex',
    alignItems: 'center',

    padding: '0.5rem',
    fontSize: '0.875rem', // text-sm
  }),
  menu: provided => ({
    ...provided,
    borderRadius: '0.375rem', // rounded-md
  }),
  singleValue: provided => ({
    ...provided,
    color: '#111827', // gray-900
  }),
  placeholder: provided => ({
    ...provided,
    color: '#9CA3AF', // gray-400
    fontSize: '0.875rem', // text-sm
  }),
}

export default function SelectComponent({
  label,
  options,
  value,
  onChange,
  error,
  isSearchable = true,
}) {
  const handleChange = selectedOption => {
    onChange(selectedOption ? selectedOption.value : '')
  }

  return (
    <div>
      <label className='block text-sm font-medium mb-2'>{label}</label>
      <Select
        value={options.find(option => option.value === value) || null}
        onChange={handleChange}
        options={options}
        placeholder={'Seleccionar ...'}
        isDisabled={options.length <= 0}
        isSearchable={isSearchable}
        isClearable={true}
        classNamePrefix='select'
        styles={customStyles}
        // Renderizamos el icono al lado de la opción seleccionada
        components={{
          Option: ({ children, ...props }) => (
            <components.Option {...props}>
              <div className=' w-5'>
                {props.isSelected && <FaCheck className='text-green-600' />}
              </div>
              {children}
            </components.Option>
          ),
        }}
      />
      {error && <p className='text-red-500 text-sm'>{error.message}</p>}
    </div>
  )
}
