import EvaluationTemplate from "../models/evaluationTemplateModel.js";

// Crear una nueva evaluación
export const createEvaluationTemplate = async (req, res) => {
  const { title, categories } = req.body;

  const createdBy = req.user.email;

  try {
    const newEvaluationTemplate = new EvaluationTemplate({
      createdBy,
      title,
      categories,
    });

    await newEvaluationTemplate.save();

    res.status(201).json({
      error: null,
      data: {
        message: "Plantilla de evaluación creada exitosamente.",
        evaluationTemplate: newEvaluationTemplate,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: {
        message: "Error al crear la plantilla de evaluación.",
        details: error.message,
      },
      data: null,
    });
  }
};

// Actualizar una evaluación
export const updateEvaluationTemplate = async (req, res) => {
  const { id } = req.params;
  const { title, categories } = req.body;

  try {
    const template = await EvaluationTemplate.findById(id);

    if (!template) {
      return res.status(404).json({
        error: {
          message: "Plantilla de evaluación no encontrada.",
        },
        data: null,
      });
    }

    template.title = title || template.title;
    template.categories = categories || template.categories;

    await template.save();

    res.status(200).json({
      error: null,
      data: {
        message: "Plantilla de evaluación modificada exitosamente.",
        evaluationTemplate: template,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: {
        message: "Error al modificar la plantilla de evaluación.",
        details: error.message,
      },
      data: null,
    });
  }
};

// Obtener una plantilla de evaluación por ID
export const getEvaluationTemplateById = async (req, res) => {
  const { id } = req.params;

  console.log(id);

  try {
    const template = await EvaluationTemplate.findById(id);

    if (!template) {
      return res.status(404).json({
        error: { message: "Plantilla de evaluación no encontrada." },
        data: null,
      });
    }

    res.status(200).json({
      error: null,
      data: {
        message: "Plantilla de evaluación encontrada.",
        evaluationTemplate: template,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: {
        message: "Error al obtener la plantilla de evaluación.",
        details: error.message,
      },
      data: null,
    });
  }
};
