export const handleServiceError = error => {
  // Si hay una respuesta del servidor
  if (error.response && error.response.data) {
    const { message, details } = error.response.data.error || {}

    // Lanzar un error con el mensaje proporcionado por el backend
    if (message) {
      throw new Error(message)
    }

    // Si hay detalles adicionales en el error
    if (details) {
      throw new Error(details)
    }
  }

  // Si no hay respuesta del servidor o es un error inesperado
  throw new Error(
    'Error inesperado en el servicio. Por favor, intenta más tarde.'
  )
}
