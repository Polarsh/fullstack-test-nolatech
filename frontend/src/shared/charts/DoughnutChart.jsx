import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

// Registrar los componentes necesarios de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend)

export default function DoughnutChart({ data, title }) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
      },
    },
  }

  return (
    <div className='w-full h-[300px] md:h-[450px]'>
      <Doughnut data={data} options={options} />
    </div>
  )
}
