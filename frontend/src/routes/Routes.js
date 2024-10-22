import {
  ChartBarIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/outline'

export const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: ChartBarIcon },
  {
    name: 'Trabajadores',
    href: '/trabajadores',
    icon: UserGroupIcon,
  },
  {
    name: 'Plantillas de evaluación',
    href: '/plantillas-evaluacion',
    icon: DocumentTextIcon,
  },
  {
    name: 'Evaluaciones',
    href: '/evaluaciones',
    icon: ClipboardDocumentCheckIcon,
  },
]
