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

// Obtener evaluaciones por employeeId
export const getEvaluationsByEmployeeId = async (req, res) => {
  const { id: evaluateeId } = req.params; // ID del empleado evaluado

  try {
    // Buscar todas las evaluaciones asignadas a este empleado (evaluateeId)
    const evaluations = await AssignedEvaluation.find({
      evaluateeId: evaluateeId,
    });

    if (evaluations.length === 0) {
      return res.status(404).json({
        error: {
          message: "No se encontraron evaluaciones para este empleado.",
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
        message: "Error al obtener las evaluaciones del empleado.",
        details: error.message,
      },
      data: null,
    });
  }
};

// Verificar si el empleado debe completar una evaluación
export const checkIfEvaluationPending = async (req, res) => {
  const employeeId = req.user.employeeId;

  console.log(employeeId);

  try {
    // Buscar evaluaciones que aún no han sido completadas por el empleado
    const pendingEvaluations = await AssignedEvaluation.find({
      evaluatorId: employeeId,
      completed: false,
    });

    if (pendingEvaluations.length === 0) {
      return res.status(200).json({
        error: null,
        data: {
          message: "No tienes evaluaciones pendientes.",
          evaluations: [],
        },
      });
    }

    res.status(200).json({
      error: null,
      data: {
        message: "Tienes evaluaciones pendientes.",
        evaluations: pendingEvaluations,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: {
        message: "Error al verificar las evaluaciones pendientes.",
        details: error.message,
      },
      data: null,
    });
  }
};

// Completar una evaluación anónima
export const completeEvaluation = async (req, res) => {
  const { assignmentId } = req.params;
  const { responses } = req.body;

  const evaluatorId = req.user.employeeId;

  try {
    // Verificar que la asignación de evaluación existe
    const assignment = await AssignedEvaluation.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({
        error: { message: "Asignación de evaluación no encontrada." },
        data: null,
      });
    }

    // Agregar las respuestas y evaluador
    assignment.responses = responses;
    assignment.evaluatorId = evaluatorId;

    // Marcar como completada
    assignment.completed = true;
    assignment.completedAt = Date.now();

    await assignment.save();

    res.status(200).json({
      error: null,
      data: {
        message: "Evaluación completada exitosamente.",
        assignment,
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
