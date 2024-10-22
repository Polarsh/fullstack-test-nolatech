import { body, validationResult } from "express-validator";

const validateFeedback = [
  body("templateId")
    .isMongoId()
    .withMessage("Debe ser un ID de plantilla válido."),

  body("comment").not().isEmpty().withMessage("El comentario es requerido."),

  // Manejar los errores de validación
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

export default validateFeedback;
