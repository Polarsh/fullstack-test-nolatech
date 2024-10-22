import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

import { AppProvider } from './context/AppContext'
import { AuthProvider } from './context/AuthContext'

import ProtectedRoute from './routes/ProtectedRoute'

import PageLayout from './layout/PageLayout'

import DefaultPage from './views/Default'
import Dashboard from './views/Dashboard'

import LogInView from './views/Auth/LogIn'
import LogOutView from './views/Auth/LogOut'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default function App() {
  return (
    <AppProvider>
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          <Route>
            <Route path='/' element={<Navigate to='/dashboard' replace />} />
            <Route path='/iniciar-sesion' element={<LogInView />} />

            {/* Protected */}
            <Route
              element={<ProtectedRoute redirectPath={'/iniciar-sesion'} />}>
              <Route path='/' element={<PageLayout />}>
                <Route path='dashboard' element={<Dashboard />} />

                <Route path='trabajadores' element={<Dashboard />} />

                <Route path='plantillas-evaluacion' element={<Dashboard />} />

                <Route path='evaluaciones' element={<Dashboard />} />
              </Route>

              {/* Cerrar sesión */}
              <Route path='/cerrar-sesion' element={<LogOutView />} />
            </Route>

            {/* Página default */}
            <Route path='*' element={<DefaultPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </AppProvider>
  )
}
