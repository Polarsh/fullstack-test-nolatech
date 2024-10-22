import { body, validationResult } from "express-validator";

// Middleware de validación de evaluacion
export const validateEvaluationTemplate = [
  body("title").notEmpty().withMessage("El título es obligatorio."),

  body("categories")
    .isArray({ min: 1 })
    .withMessage("Debe haber al menos una categoría.")
    .custom((categories) => {
      for (const category of categories) {
        if (!category.name || category.name.trim() === "") {
          throw new Error("Cada categoría debe tener un nombre.");
        }
        if (
          !Array.isArray(category.questions) ||
          category.questions.length === 0
        ) {
          throw new Error("Cada categoría debe tener al menos una pregunta.");
        }
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
