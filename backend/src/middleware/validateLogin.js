import { body, validationResult } from "express-validator";

// Middleware de validación de login
const validateLogin = [
  body("email").isEmail().withMessage("Debe ser un correo electrónico válido"),
  body("password").not().isEmpty().withMessage("La contraseña es requerida"),

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

export default validateLogin;
