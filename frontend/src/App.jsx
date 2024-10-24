import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

import { AppProvider } from './context/AppContext'
import { AuthProvider } from './context/AuthContext'
import { UserProvider } from './context/UserContext'
import { EvaluationProvider } from './context/EvaluationContext'

import ProtectedRoute from './routes/ProtectedRoute'

import PageLayout from './layout/PageLayout'

import DefaultPage from './views/Default'
import Dashboard from './views/Dashboard'

import LogInView from './views/Auth/LogIn'
import LogOutView from './views/Auth/LogOut'

import UserMenuPage from './views/Users/UserMenu'
import AddUserPage from './views/Users/AddUser'
import ViewUserPage from './views/Users/ViewUser'
import AsignEvaluationPage from './views/Users/AsignEvaluation'

import EvaluationMenuPage from './views/Evaluations/EvaluationMenu'
import EditEvaluationPage from './views/Evaluations/EditEvaluation'
import AddEvaluationPage from './views/Evaluations/AddEvaluation'
import ViewEvaluationPage from './views/Evaluations/ViewEvaluation'
import PendingEvaluationsPage from './views/Evaluations/PendingEvaluations'
import CompleteEvaluationPage from './views/Evaluations/CompleteEvaluation'
import EvaluationFeedbackPage from './views/Evaluations/EvaluationFeedback'

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
        <UserProvider>
          <EvaluationProvider>
            <ScrollToTop />
            <Routes>
              <Route>
                <Route
                  path='/'
                  element={<Navigate to='/dashboard' replace />}
                />
                <Route path='/iniciar-sesion' element={<LogInView />} />

                {/* Protected */}
                <Route
                  element={<ProtectedRoute redirectPath={'/iniciar-sesion'} />}>
                  <Route path='/' element={<PageLayout />}>
                    <Route path='dashboard' element={<Dashboard />} />

                    <Route path='trabajadores'>
                      <Route path='' element={<UserMenuPage />} />
                      <Route path='nuevo' element={<AddUserPage />} />
                      <Route
                        path='ver/:employeeId'
                        element={<ViewUserPage />}
                      />
                    </Route>

                    <Route path='plantillas-evaluacion'>
                      <Route path='' element={<EvaluationMenuPage />} />
                      <Route path='nuevo' element={<AddEvaluationPage />} />
                      <Route
                        path='ver/:evaluationId'
                        element={<ViewEvaluationPage />}
                      />
                      <Route
                        path='editar/:evaluationId'
                        element={<EditEvaluationPage />}
                      />
                    </Route>

                    <Route path='evaluaciones'>
                      <Route path='' element={<PendingEvaluationsPage />} />
                      <Route
                        path='evaluacion/:evaluationId'
                        element={<CompleteEvaluationPage />}
                      />
                      <Route
                        path='feedback/:evaluationId'
                        element={<EvaluationFeedbackPage />}
                      />
                    </Route>

                    <Route
                      path='asignar/:employeeId'
                      element={<AsignEvaluationPage />}
                    />
                  </Route>

                  {/* Cerrar sesión */}
                  <Route path='/cerrar-sesion' element={<LogOutView />} />

                  {/* Página default */}
                  <Route path='*' element={<DefaultPage />} />
                </Route>
              </Route>
            </Routes>
          </EvaluationProvider>
        </UserProvider>
      </AuthProvider>
    </AppProvider>
  )
}
