import express from "express";

import {
  assignEvaluationToEmployee,
  completeEvaluation,
  createEvaluationTemplate,
  getAllEvaluations,
  getEvaluationsByEmployeeId,
  getEvaluationsByEvaluatorId,
  getEvaluationTemplateById,
  updateEvaluationTemplate,
} from "../controllers/evaluationController.js";

import authenticateAndAuthorizeRoles from "../middleware/auth.js";

import {
  validateAssignEvaluation,
  validateEvaluationTemplate,
} from "../middleware/validateEvaluation.js";

const router = express.Router();

// Crear una nueva template evaluación
router.post(
  "",
  authenticateAndAuthorizeRoles("Admin", "Manager"),
  validateEvaluationTemplate,
  createEvaluationTemplate
);

// Obtener todas las evaluacioens templates
router.get(
  "",
  authenticateAndAuthorizeRoles("Admin", "Manager"),
  getAllEvaluations
);

// Actualizar una evaluación
router.put(
  "/:id",
  authenticateAndAuthorizeRoles("Admin", "Manager"),
  validateEvaluationTemplate,
  updateEvaluationTemplate
);

// Obtener una evaluación
router.get(
  "/:id",
  authenticateAndAuthorizeRoles("Admin", "Manager", "Employee"),
  getEvaluationTemplateById
);

// Ruta para asignar una evaluación a los empleados
router.post(
  "/assign",
  authenticateAndAuthorizeRoles("Admin", "Manager"),
  validateAssignEvaluation,
  assignEvaluationToEmployee
);

// Obtener evaluaciones a realizar
router.get(
  "/evaluator/:id",
  authenticateAndAuthorizeRoles("Admin", "Manager", "Employee"),
  getEvaluationsByEvaluatorId
);

// Obtener evaluaciones de un empleado
router.get(
  "/employee/:id",
  authenticateAndAuthorizeRoles("Admin", "Manager", "Employee"),
  getEvaluationsByEmployeeId
);

// Ruta para completar una evaluación
router.post(
  "/complete",
  authenticateAndAuthorizeRoles("Admin", "Manager", "Employee"),
  completeEvaluation
);

export default router;
