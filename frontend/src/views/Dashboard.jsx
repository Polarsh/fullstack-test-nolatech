import { useAuth } from '../context/AuthContext'

import AdminDashboard from './Dashboards/AdminDashboard'
import EmployeeDashboard from './Dashboards/EmployeeDashboard'
import ManagerDashboard from './Dashboards/ManagerDashboard'

export default function DashboardPage() {
  const { user } = useAuth()

  if (!user) {
    return <div>Cargando...</div>
  }

  switch (user.role) {
    case 'Admin':
      return <AdminDashboard />
    case 'Manager':
      return <ManagerDashboard />
    case 'Employee':
      return <EmployeeDashboard />
    default:
      return <div>No se encontró el rol del usuario</div>
  }
}
