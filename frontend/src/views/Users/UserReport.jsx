import { useParams } from 'react-router-dom'
import { useUsers } from '../../context/UserContext'
import { useEffect, useState } from 'react'
import TitlePageComponent from '../../shared/components/TitlePage'
import BarChart from '../../shared/charts/BarChart'

const data = [
  {
    templateTitle: 'Evaluación de Habilidades de Comunicación',
    categories: [
      {
        categoryName: 'Comunicación Verbal',
        categoryAverage: '3.00',
        questions: [
          {
            question: '¿Habla de forma clara?',
            averageScore: '3.00',
            responses: [5, 1],
          },
          {
            question: '¿Usa un tono adecuado?',
            averageScore: '3.00',
            responses: [5, 1],
          },
        ],
      },
      {
        categoryName: 'Escucha Activa',
        categoryAverage: '3.00',
        questions: [
          {
            question: '¿Escucha sin interrumpir?',
            averageScore: '3.00',
            responses: [5, 1],
          },
          {
            question: '¿Hace preguntas pertinentes?',
            averageScore: '3.00',
            responses: [5, 1],
          },
        ],
      },
    ],
  },
  {
    templateTitle: 'Evaluación de Liderazgo',
    categories: [
      {
        categoryName: 'Delegación',
        categoryAverage: '3.00',
        questions: [
          {
            question: '¿Sabe delegar tareas efectivamente?',
            averageScore: '3.00',
            responses: [3],
          },
          {
            question: '¿Confía en su equipo?',
            averageScore: '3.00',
            responses: [3],
          },
        ],
      },
      {
        categoryName: 'Toma de decisiones',
        categoryAverage: '3.00',
        questions: [
          {
            question: '¿Toma decisiones informadas?',
            averageScore: '3.00',
            responses: [3],
          },
          {
            question: '¿Evalúa riesgos antes de decidir?',
            averageScore: '3.00',
            responses: [3],
          },
        ],
      },
    ],
  },
]

export default function UserReportPage() {
  const { employeeId } = useParams()

  const { getUserReportById } = useUsers()

  const [reportData, setReportData] = useState(data)

  useEffect(() => {
    async function getReportData() {
      const data = await getUserReportById(employeeId)

      setReportData(data)
    }

    getReportData()
  }, [])

  console.log({ reportData })

  const dataReport = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
    datasets: [
      {
        label: 'Ventas de 2024',
        data: [30, 50, 40, 60, 70, 55],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  }

  return (
    <div className='space-y-6'>
      <TitlePageComponent
        title='Reporte de Evaluaciones'
        description={`Resultados de las evaluaciones para el empleado ID: ${employeeId}`}
      />

      <BarChart title={'Ventas mensuales de 2024'} data={dataReport} />
    </div>
  )
}
