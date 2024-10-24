import AssignedEvaluation from "../models/assignedEvaluation.js";
import Employee from "../models/employeeModel.js";
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

export const getAllEvaluations = async (req, res) => {
  try {
    const evaluations = await EvaluationTemplate.find();

    if (evaluations.length === 0) {
      return res.status(404).json({
        error: {
          message: "No se encontraron plantillas de evaluación.",
        },
        data: null,
      });
    }

    res.status(200).json({
      error: null,
      data: evaluations,
    });
  } catch (error) {
    res.status(500).json({
      error: {
        message: "Error al obtener las plantillas de evaluación.",
        details: error.message,
      },
      data: null,
    });
  }
};

// Obtener una plantilla de evaluación por ID
export const getEvaluationTemplateById = async (req, res) => {
  const { id: evaluationId } = req.params;

  try {
    const template = await EvaluationTemplate.findById(evaluationId);

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

// Asignar evaluación
export const assignEvaluationToEmployee = async (req, res) => {
  const { evaluateeId, evaluationTemplateId, evaluatorIds } = req.body;

  try {
    // Verificar que la plantilla de evaluación existe
    const template = await EvaluationTemplate.findById(evaluationTemplateId);
    if (!template) {
      return res.status(404).json({
        error: { message: "Plantilla de evaluación no encontrada." },
        data: null,
      });
    }

    // Verificar que el evaluado
    const evaluatee = await Employee.findById(evaluateeId);
    if (!evaluatee) {
      return res.status(404).json({
        error: { message: "Empleado a evaluar no existe." },
        data: null,
      });
    }

    // Verificar que el evaluado
    const evaluation = await AssignedEvaluation.findOne({
      evaluateeId,
      evaluationTemplateId,
    });
    if (evaluation) {
      return res.status(404).json({
        error: { message: "Empleado ya ha sido evaluado con esta plantilla." },
        data: null,
      });
    }

    // Asignar la evaluación a cada empleado que debe responderla
    const assignments = [];

    for (const evaluatorId of evaluatorIds) {
      const newAssignment = new AssignedEvaluation({
        evaluatorId, // El evaluador
        evaluateeId, // El evaluado
        evaluationTemplateId,
        responses: template.categories.map((category) => ({
          categoryName: category.categoryName,
          questions: category.questions.map((q) => ({
            question: q.question,
            answer: null, // Respuesta vacía al principio
          })),
        })),
        completed: false, // Aún no ha sido completada
        assignedAt: Date.now(),
      });

      // Guardar cada asignación
      await newAssignment.save();
      assignments.push(newAssignment);
    }

    res.status(201).json({
      error: null,
      data: {
        message: "Evaluación asignada al empleado exitosamente.",
        assignments,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: {
        message: "Error al asignar la evaluación.",
        details: error.message,
      },
      data: null,
    });
  }
};

// Obtener las plantillas asignadas
export const getAllAssignedEvaluations = async (req, res) => {
  try {
    const evaluations = await AssignedEvaluation.find().populate(
      "evaluatorId",
      "name"
    );

    // Si no hay evaluaciones, simplemente devuelve un array vacío
    if (evaluations.length === 0) {
      return res.status(200).json({
        error: null,
        data: [],
        message: "No hay evaluaciones asignadas.",
      });
    }

    res.status(200).json({
      error: null,
      data: evaluations,
    });
  } catch (error) {
    res.status(500).json({
      error: {
        message: "Error al obtener las evaluaciones del empleado.",
        details: error.message,
      },
      data: null,
    });
  }
};

// Obtener evaluaciones por employeeId
export const getEvaluationsByEmployeeId = async (req, res) => {
  const { id: evaluateeId } = req.params; // ID del empleado evaluado

  try {
    // Buscar todas las evaluaciones asignadas a este empleado (evaluateeId)
    const evaluations = await AssignedEvaluation.find({
      evaluateeId: evaluateeId,
    }).populate("evaluationTemplateId", "title");

    // Si no hay evaluaciones, simplemente devuelve un array vacío
    if (evaluations.length === 0) {
      return res.status(200).json({
        error: null,
        data: [],
        message: "Este empleado no tiene evaluaciones asignadas.",
      });
    }

    // Agrupar evaluaciones por evaluationTemplateId
    const groupedEvaluations = evaluations.reduce((acc, evaluation) => {
      const { evaluationTemplateId } = evaluation;

      // Si no existe ya este templateId en el acumulador, lo añadimos
      if (!acc[evaluationTemplateId._id]) {
        acc[evaluationTemplateId._id] = {
          evaluationTemplateId: evaluationTemplateId._id,
          title: evaluationTemplateId.title,
          categories: evaluationTemplateId.categories,
          assignedAt: evaluation.assignedAt,
          evaluations: [], // Aquí guardamos las evaluaciones individuales si es necesario
        };
      }

      // Añadir esta evaluación a la lista del template correspondiente
      acc[evaluationTemplateId._id].evaluations.push(evaluation);

      return acc;
    }, {});

    // Convertir el objeto en un array para devolverlo en el formato deseado
    const result = Object.values(groupedEvaluations);

    res.status(200).json({
      error: null,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      error: {
        message: "Error al obtener las evaluaciones del empleado.",
        details: error.message,
      },
      data: null,
    });
  }
};

// Obtener evaluaciones por evaluator
export const getEvaluationsByEvaluatorId = async (req, res) => {
  const employeeId = req.user.employeeId;

  try {
    // Buscar evaluaciones que aún no han sido completadas por el empleado
    const evaluations = await AssignedEvaluation.find({
      evaluatorId: employeeId,
    })
      .populate("evaluationTemplateId", "title")
      .populate("evaluateeId", "name");

    if (evaluations.length === 0) {
      return res.status(200).json({
        error: null,
        data: {
          message: "No tienes evaluaciones.",
          data: [],
        },
      });
    }

    res.status(200).json({
      error: null,
      data: {
        message: "Evaluaciones encontradas.",
        data: evaluations,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: {
        message: "Error al obtener las evaluaciones del empleado.",
        details: error.message,
      },
      data: null,
    });
  }
};

// Completar una evaluación anónima
export const completeEvaluation = async (req, res) => {
  const { evaluationId, responses } = req.body;

  try {
    // Verificar que la asignación de evaluación existe
    const evaluation = await AssignedEvaluation.findById(evaluationId);
    if (!evaluation) {
      return res.status(404).json({
        error: { message: "Evaluación no encontrada." },
        data: null,
      });
    }

    // Agregar las respuestas y evaluador
    evaluation.responses = responses;

    // Marcar como completada
    evaluation.completed = true;
    evaluation.completedAt = Date.now();

    await evaluation.save();

    res.status(200).json({
      error: null,
      data: {
        message: "Evaluación completada exitosamente.",
        evaluation,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: {
        message: "Error al completar la evaluación.",
        details: error.message,
      },
      data: null,
    });
  }
};
