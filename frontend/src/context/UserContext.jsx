import { createContext, useContext, useState, useEffect } from 'react'
import UserServices from '../modules/users/userServices'
import { toast } from 'sonner'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([])
  const [userDetails, setUserDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadUsers = async () => {
    try {
      setLoading(true)
      const usersData = await UserServices.getAllUsers()
      setUsers(usersData)
      /* toast.success('Lista de usuarios cargada correctamente'); */
    } catch (err) {
      setError('Error al cargar la lista de usuarios.')
      console.error(err)
      toast.error('Error al cargar la lista de usuarios')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  const fetchUserDetails = async userId => {
    try {
      setLoading(true)
      const userDetails = await UserServices.getUserbyId(userId)
      setUserDetails(userDetails)
      /*  toast.success('Detalles del usuario cargados correctamente') */
    } catch (err) {
      setError('Error al cargar los detalles del usuario.')
      console.error(err)
      toast.error('Error al cargar los detalles del usuario')
    } finally {
      setLoading(false)
    }
  }

  const createUser = async user => {
    try {
      setLoading(true)
      await UserServices.createUser(user)

      loadUsers()
      toast.success('Usuario creado correctamente')
    } catch (err) {
      setError('Error al crear usuario.')
      console.error(err)
      toast.error(`Error al crear el usuario: ${err.message} `)
    } finally {
      setLoading(false)
    }
  }

  return (
    <UserContext.Provider
      value={{
        users,
        userDetails,
        loading,
        error,
        fetchUserDetails,
        createUser,
      }}>
      {children}
    </UserContext.Provider>
  )
}

// Hook para usar el contexto
export const useUsers = () => {
  return useContext(UserContext)
}
