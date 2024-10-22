import AssignedEvaluation from "../models/assignedEvaluation.js";

// Generar reporte
export const getReportForEmployee = async (req, res) => {
  const { id: employeeId } = req.params;

  try {
    // Buscar todas las evaluaciones completadas para este empleado
    const evaluations = await AssignedEvaluation.find({
      evaluateeId: employeeId,
      completed: true,
    }).populate("evaluationTemplateId", "title"); // Popular el título de la plantilla

    if (evaluations.length === 0) {
      return res.status(404).json({
        error: {
          message:
            "No se encontraron evaluaciones completadas para este empleado.",
        },
        data: null,
      });
    }

    // Estructurar el reporte para gráficas
    const report = evaluations.map((evaluation) => ({
      templateTitle: evaluation.evaluationTemplateId.title, // Título de la plantilla de evaluación
      responses: evaluation.responses.map((category) => ({
        categoryName: category.categoryName,
        questions: category.questions.map((question) => ({
          question: question.question,
          answer: question.answer,
        })),
      })),
      completedAt: evaluation.completedAt,
    }));

    res.status(200).json({
      error: null,
      data: {
        message: "Reporte generado exitosamente.",
        report,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: {
        message: "Error al generar el reporte.",
        details: error.message,
      },
      data: null,
    });
  }
};
