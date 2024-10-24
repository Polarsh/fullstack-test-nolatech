import AssignedEvaluation from "../models/assignedEvaluation.js";

// calcular el promedio
const calculateAverage = (values) => {
  if (values.length === 0) {
    return "N/A";
  }

  const sum = values.reduce((total, value) => total + value, 0);
  const average = sum / values.length;

  return average.toFixed(2);
};

// Función para procesar las evaluaciones y generar el reporte
const generateReport = (evaluations) => {
  const report = {};

  evaluations.forEach((evaluation) => {
    const { evaluationTemplateId, responses } = evaluation;
    const templateId = evaluationTemplateId._id;

    if (!report[templateId]) {
      report[templateId] = {
        templateTitle: evaluationTemplateId.title,
        categories: {},
      };
    }

    responses.forEach((category) => {
      const { categoryName, questions } = category;

      if (!report[templateId].categories[categoryName]) {
        report[templateId].categories[categoryName] = {
          questions: {},
          scores: [],
        };
      }

      questions.forEach((question) => {
        const { question: questionText, answer } = question;

        if (
          !report[templateId].categories[categoryName].questions[questionText]
        ) {
          report[templateId].categories[categoryName].questions[questionText] =
            { responses: [], scores: [] };
        }

        report[templateId].categories[categoryName].questions[
          questionText
        ].responses.push(answer);
        report[templateId].categories[categoryName].questions[
          questionText
        ].scores.push(answer);
        report[templateId].categories[categoryName].scores.push(answer);
      });
    });
  });

  // Convertir a formato final con promedios
  return Object.keys(report).map((templateId) => {
    const template = report[templateId];
    const categories = Object.keys(template.categories).map((categoryName) => {
      const category = template.categories[categoryName];

      const questions = Object.keys(category.questions).map((questionText) => {
        const question = category.questions[questionText];
        return {
          question: questionText,
          averageScore: calculateAverage(question.scores),
          responses: question.responses,
        };
      });

      return {
        categoryName,
        categoryAverage: calculateAverage(category.scores),
        questions,
      };
    });

    return {
      templateTitle: template.templateTitle,
      categories,
    };
  });
};

export const getReportForEmployee = async (req, res) => {
  const { id: employeeId } = req.params;

  try {
    const evaluations = await AssignedEvaluation.find({
      evaluateeId: employeeId,
      completed: true,
    }).populate("evaluationTemplateId", "title");

    if (evaluations.length === 0) {
      return res.status(404).json({
        error: {
          message:
            "No se encontraron evaluaciones completadas para este empleado.",
        },
        data: null,
      });
    }

    const report = generateReport(evaluations);

    res.status(200).json({
      error: null,
      data: { message: "Reporte generado exitosamente.", report },
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
