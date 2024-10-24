import { useParams } from 'react-router-dom'
import { useUsers } from '../../context/UserContext'
import { useEffect, useState } from 'react'
import TitlePageComponent from '../../shared/components/TitlePage'
import BarChart from '../../shared/charts/BarChart'
import RadarChart from '../../shared/charts/RadarChart'

export default function UserReportPage() {
  const { employeeId } = useParams()

  const { getUserReportById, loading } = useUsers()

  const [reportData, setReportData] = useState(null)

  useEffect(() => {
    async function getReportData() {
      const data = await getUserReportById(employeeId)

      setReportData(data)
    }

    getReportData()
  }, [employeeId])

  if (loading) {
    return <>Cargando</>
  }

  if (!reportData) {
    return <>Error al cargar la informacion del reporte</>
  }

  return (
    <div className='space-y-6'>
      <TitlePageComponent
        title='Análisis de Evaluaciones'
        description='Revisa los gráficos que muestran el puntaje promedio de las categorías evaluadas.'
      />

      {reportData.length === 0 ? (
        <div className='bg-white shadow sm:rounded-lg px-4 py-5 sm:p-6'>
          <h2 className='text-lg font-semibold text-gray-800 mb-2'>
            Sin evaluaciones completadas
          </h2>
          <p className='text-sm text-gray-600'>
            Actualmente, no hay evaluaciones completadas disponibles para este
            empleado.
          </p>
        </div>
      ) : (
        <>
          <CategoryBarGraphs reportData={reportData} />
          <CategoryRadarGraphs reportData={reportData} />
        </>
      )}
    </div>
  )
}

const CategoryBarGraphs = ({ reportData }) => {
  const generateCategoryReport = categories => {
    const categoryNameList = categories.map(category => category.categoryName)
    const categoryAverageList = categories.map(
      category => category.categoryAverage
    )

    const dataReport = {
      labels: categoryNameList,
      datasets: [
        {
          label: 'Promedio de respuestas por categoría',
          data: categoryAverageList,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    }

    return dataReport
  }

  return (
    <div className='bg-white shadow sm:rounded-lg px-4 py-5 sm:p-6'>
      <h2 className='text-lg font-semibold text-gray-800 mb-4'>
        Gráficos de barra
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 pt-6'>
        {reportData.map(template => (
          <div
            key={template.templateTitle}
            className='bg-green-50 bg-opacity-50 shadow rounded p-4'>
            <BarChart
              title={template.templateTitle}
              data={generateCategoryReport(template.categories)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

const CategoryRadarGraphs = ({ reportData }) => {
  const generateRadarData = categories => {
    const labels = categories.map(category => category.categoryName)
    const dataValues = categories.map(category => category.categoryAverage)

    return {
      labels, // Etiquetas del gráfico
      datasets: [
        {
          label: 'Puntaje Promedio por Categoría',
          data: dataValues,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2,
        },
      ],
    }
  }

  return (
    <div className='bg-white shadow sm:rounded-lg px-4 py-5 sm:p-6'>
      <h2 className='text-lg font-semibold text-gray-800 mb-4'>
        Gráficos de radar
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {reportData.map(template => (
          <div
            key={template.templateTitle}
            className='bg-green-50 bg-opacity-50 shadow rounded p-4'>
            <RadarChart
              title={template.templateTitle}
              data={generateRadarData(template.categories)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
