import { body, validationResult } from "express-validator";

// Middleware de validación para el registro de usuario
const validateUser = [
  body("name").not().isEmpty().withMessage("El nombre es requerido"),
  body("email").isEmail().withMessage("Debe ser un correo electrónico válido"),
  body("phone")
    .isMobilePhone()
    .withMessage("Debe ser un número de teléfono válido"),
  body("position").not().isEmpty().withMessage("El puesto es requerido"),
  body("department")
    .not()
    .isEmpty()
    .withMessage("El departamento es requerido"),
  body("role")
    .isIn(["Admin", "Manager", "Employee"])
    .withMessage("El rol debe ser Admin, Manager o Employee"),

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

export default validateUser;
