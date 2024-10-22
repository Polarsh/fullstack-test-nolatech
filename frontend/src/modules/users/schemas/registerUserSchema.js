import * as Yup from 'yup'

import roles from '../../../../db/roles.json'
import positions from '../../../../db/positions.json'
import departments from '../../../../db/departments.json'

export const registerUserSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no debe exceder los 50 caracteres')
    .required('El nombre es obligatorio'),

  email: Yup.string()
    .email('Debe ser un correo electrónico válido')
    .required('El correo electrónico es obligatorio'),

  role: Yup.string()
    .oneOf(roles, 'El rol no es válido')
    .required('El rol es obligatorio'),

  phone: Yup.string()
    .min(8, 'El teléfono debe tener al menos 8 dígitos')
    .max(15, 'El teléfono no debe exceder los 15 dígitos')
    .required('El teléfono es obligatorio'),

  position: Yup.string()
    .oneOf(positions, 'La posición no es válido')
    .required('La posición es obligatorio'),

  department: Yup.string()
    .oneOf(departments, 'El departamento no es válido')
    .required('El departamento es obligatorio'),
})
