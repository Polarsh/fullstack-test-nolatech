import * as yup from 'yup'

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email('Correo electrónico inválido')
    .required('Correo electrónico es obligatorio')
    .matches(/^[^\s]+$/, 'El correo electrónico no debe contener espacios'),
  password: yup
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('La contraseña es obligatoria')
    .matches(/^[^\s]+$/, 'La contraseña no debe contener espacios'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Las contraseñas deben coincidir')
    .required('Confirma tu contraseña')
    .matches(
      /^[^\s]+$/,
      'La confirmación de la contraseña no debe contener espacios'
    ),
})
