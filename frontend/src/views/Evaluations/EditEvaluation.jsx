import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { MdCancel } from 'react-icons/md'
import { BiSave, BiTrash } from 'react-icons/bi'
import { AiOutlinePlus } from 'react-icons/ai'

import LoadingModal from '../../shared/components/LoadingModal'
import ButtonComponent, { ButtonStyle } from '../../shared/components/Button'
import TitlePageComponent from '../../shared/components/TitlePage'
import InputComponent from '../../shared/components/Input'
import InputAreaComponent from '../../shared/components/InputArea'

import { useEvaluation } from '../../context/EvaluationContext'
import { evaluationTemplateSchema } from '../../modules/evaluationTemplate/schemas/evaluationTemplateSchema'

const defaultCategory = {
  categoryName: '',
  questions: [{ question: '' }],
}

const initialData = {
  title: '',
  categories: [defaultCategory],
}

export default function EditEvaluationPage() {
  const { evaluationId } = useParams()

  const {
    evaluation,
    loading,
    fetchEvaluationTemplateById,
    updateEvaluationTemplate,
  } = useEvaluation()
  const navigate = useNavigate()

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialData,
    resolver: yupResolver(evaluationTemplateSchema),
  })

  useEffect(() => {
    if (evaluation) {
      setValue('title', evaluation.title)
      setCategories(evaluation.categories)
    }
  }, [evaluation])

  const [categories, setCategories] = useState([defaultCategory])

  useEffect(() => {
    if (evaluationId) {
      fetchEvaluationTemplateById(evaluationId)
    }
  }, [])

  useEffect(() => {
    setValue('categories', categories)
  }, [categories])

  // Función para añadir una nueva categoría
  const handleAddCategory = () => {
    setCategories([
      ...categories,
      { categoryName: '', questions: [{ question: '' }] },
    ])
  }

  // Función para eliminar una categoría
  const handleRemoveCategory = index => {
    const newCategories = categories.filter((_, catIndex) => catIndex !== index)
    setCategories(newCategories)
  }

  // Función para añadir una nueva pregunta a una categoría específica
  const handleAddQuestion = categoryIndex => {
    const updatedCategories = categories.map((category, index) => {
      if (index === categoryIndex) {
        return {
          ...category,
          questions: [...category.questions, { question: '' }],
        }
      }
      return category
    })
    setCategories(updatedCategories)
  }

  // Función para eliminar una pregunta de una categoría específica
  const handleRemoveQuestion = (categoryIndex, questionIndex) => {
    const updatedCategories = categories.map((category, index) => {
      if (index === categoryIndex) {
        const updatedQuestions = category.questions.filter(
          (_, qIndex) => qIndex !== questionIndex
        )
        return {
          ...category,
          questions: updatedQuestions,
        }
      }
      return category
    })
    setCategories(updatedCategories)
  }

  // Función para manejar el envío del formulario
  const onSubmit = async data => {
    try {
      const formattedData = {
        title: data.title,
        categories, // Enviamos las categorías del estado
      }

      await updateEvaluationTemplate(evaluationId, formattedData)
      navigateToMenu()
    } catch (error) {}
  }

  const navigateToMenu = () => {
    navigate('/plantillas-evaluacion')
  }

  return (
    <div className='bg-white shadow sm:rounded-lg px-4 py-5 sm:p-6'>
      <TitlePageComponent
        title='Editar plantilla de evaluación'
        description='Aquí podrás editar una nueva plantilla'
      />
      <form className=' mt-6 space-y-6' onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name='title'
          control={control}
          render={({ field }) => (
            <InputComponent
              {...field}
              label='Título'
              placeholder='Ej. Evaluación de Desempeño'
              errors={errors.title}
            />
          )}
        />

        {/* Renderizar categorías dinámicamente */}
        {categories.map((category, categoryIndex) => (
          <div key={categoryIndex} className='mt-4 border-t-2 pt-4'>
            <InputComponent
              value={category.categoryName}
              onChange={e => {
                const newCategories = [...categories]
                newCategories[categoryIndex].categoryName = e.target.value
                setCategories(newCategories)
              }}
              errors={errors.categories?.[categoryIndex]?.categoryName}
              label={`Categoría ${categoryIndex + 1}`}
              placeholder='Ej. Liderazgo'
            />

            {/* Renderizar preguntas dinámicas dentro de la categoría */}
            {category.questions.map((question, questionIndex) => (
              <div
                key={questionIndex}
                className='pl-6 mt-2 gap-2 items-center w-full flex'>
                <div className=' flex-grow'>
                  <InputAreaComponent
                    value={question.question}
                    onChange={e => {
                      const newCategories = [...categories]
                      newCategories[categoryIndex].questions[
                        questionIndex
                      ].question = e.target.value
                      setCategories(newCategories)
                    }}
                    errors={
                      errors.categories?.[categoryIndex]?.questions?.[
                        questionIndex
                      ]?.question
                    }
                    label={`Pregunta ${questionIndex + 1}`}
                    placeholder='Ej. ¿Demuestra habilidades de liderazgo?'
                  />
                </div>
                <button
                  type='button'
                  title='Eliminar pregunta'
                  className='text-red-500 hover:text-red-700 disabled:cursor-not-allowed h-full mt-6 px-4'
                  disabled={category.questions.length <= 1}
                  onClick={() =>
                    handleRemoveQuestion(categoryIndex, questionIndex)
                  }>
                  <BiTrash className=' h-6 w-6' />
                </button>
              </div>
            ))}

            <div className='flex justify-end mt-6 gap-6'>
              <ButtonComponent
                onClick={() => handleRemoveCategory(categoryIndex)}
                icon={BiTrash}
                label='Eliminar Categoría'
                variant={ButtonStyle.Cancel}
              />
              <ButtonComponent
                onClick={() => handleAddQuestion(categoryIndex)}
                icon={AiOutlinePlus}
                label='Añadir Pregunta'
                variant={ButtonStyle.Outline}
              />
            </div>
          </div>
        ))}

        {/* Botones de acción */}
        <div className='flex flex-col sm:flex-row justify-between pt-4 gap-6'>
          {/* Botón de añadir categoría */}
          <div>
            <ButtonComponent
              onClick={handleAddCategory}
              icon={AiOutlinePlus}
              label='Añadir Categoría'
              variant={ButtonStyle.Outline}
            />
          </div>

          {/* Botones de Cancelar y Crear Plantilla */}
          <div className='flex justify-end gap-6'>
            <ButtonComponent
              onClick={navigateToMenu}
              icon={MdCancel}
              label={'Cancelar'}
              variant={ButtonStyle.Cancel}
            />
            <ButtonComponent
              isSubmit={true}
              icon={BiSave}
              label={'Guardar cambios'}
              variant={ButtonStyle.Fill}
            />
          </div>
        </div>
      </form>

      {loading && <LoadingModal title={'Cargando. Por favor espere'} />}
    </div>
  )
}
