import { body, validationResult } from "express-validator";

// Middleware de validación de evaluacion
export const validateEvaluationTemplate = [
  body("title").notEmpty().withMessage("El título es obligatorio."),

  body("categories")
    .isArray({ min: 1 })
    .withMessage("Debe haber al menos una categoría.")
    .custom((categories) => {
      for (const category of categories) {
        // Validar el nombre de cada categoría
        if (!category.name || category.name.trim() === "") {
          throw new Error("Cada categoría debe tener un nombre.");
        }
        // Validar que cada categoría tenga preguntas
        if (
          !Array.isArray(category.questions) ||
          category.questions.length === 0
        ) {
          throw new Error("Cada categoría debe tener al menos una pregunta.");
        }
        // Validar que cada pregunta dentro de la categoría sea válida
        for (const question of category.questions) {
          if (!question.question || question.question.trim() === "") {
            throw new Error("Cada pregunta debe tener texto.");
          }
        }
      }
      return true;
    }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const validationErrors = errors.array().map((error) => error.msg);

      return res.status(400).json({
        error: { message: "Error de validación", details: validationErrors },
        data: null,
      });
    }
    next();
  },
];

export const validateAssignEvaluation = [
  // Validar el ID del evaluado (evaluateeId)
  body("evaluateeId")
    .notEmpty()
    .withMessage("El ID del evaluado es obligatorio.")
    .isMongoId()
    .withMessage("El ID del evaluado debe ser un MongoID válido."),

  // Validar el ID de la plantilla de evaluación (evaluationTemplateId)
  body("evaluationTemplateId")
    .notEmpty()
    .withMessage("El ID de la plantilla de evaluación es obligatorio.")
    .isMongoId()
    .withMessage("El ID de la plantilla debe ser un MongoID válido."),

  // Validar que los evaluatorIds sean un array no vacío
  body("evaluatorIds")
    .isArray({ min: 1 })
    .withMessage("Debe haber al menos un evaluador.")
    .custom((evaluatorIds) => {
      evaluatorIds.forEach((id) => {
        if (!id.match(/^[a-f\d]{24}$/i)) {
          throw new Error("Cada ID de evaluador debe ser un MongoID válido.");
        }
      });
      return true;
    }),
];
