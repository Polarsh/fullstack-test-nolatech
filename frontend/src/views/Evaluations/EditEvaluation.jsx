import { useParams } from 'react-router-dom'

export default function EditEvaluationPage() {
  const { evaluationId } = useParams()

  return <div>EditEvaluationPage</div>
}
