import axios from 'axios'

// Crear instancia de Axios configurada
const httpHelper = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL || 'http://localhost:5000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Método para configurar el token de autenticación en las solicitudes
export const setAuthToken = token => {
  if (token) {
    httpHelper.defaults.headers.common.Authorization = `Bearer ${token}`
  } else {
    delete httpHelper.defaults.headers.common.Authorization
  }
}

export default httpHelper
