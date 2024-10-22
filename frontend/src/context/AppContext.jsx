import { createContext, useContext } from 'react'
import { Toaster } from 'sonner'

export const appContext = createContext()

export const useApp = () => {
  const context = useContext(appContext)
  if (!context) {
    throw new Error('useApp debe usarse dentro de un AppProvider')
  }
  return context
}

export function AppProvider({ children }) {
  return (
    <appContext.Provider value={{}}>
      {children}
      <Toaster richColors position='bottom-right' />
    </appContext.Provider>
  )
}
