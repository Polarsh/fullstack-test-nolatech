export const formatDate = dateString => {
  if (!dateString) return '' // Si no hay fecha, devuelve una cadena vacía
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' }
  return new Date(dateString).toLocaleDateString('es-ES', options)
}
