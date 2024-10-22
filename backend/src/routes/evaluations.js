import express from "express";

import {
  assignEvaluationToEmployee,
  checkIfEvaluationPending,
  completeEvaluation,
  createEvaluationTemplate,
  getAllEvaluations,
  getEvaluationsByEmployeeId,
  getEvaluationTemplateById,
  updateEvaluationTemplate,
} from "../controllers/evaluationController.js";

import authenticateAndAuthorizeRoles from "../middleware/auth.js";

import {
  validateAssignEvaluation,
  validateEvaluationTemplate,
} from "../middleware/validateEvaluation.js";

const router = express.Router();

// Ruta para verificar si un empleado tiene evaluaciones pendientes
router.get(
  "/pending",
  authenticateAndAuthorizeRoles("Admin", "Manager", "Employee"),
  checkIfEvaluationPending
);

// Crear una nueva evaluación
router.post(
  "",
  authenticateAndAuthorizeRoles("Admin", "Manager"),
  validateEvaluationTemplate,
  createEvaluationTemplate
);

// Obtener todas las evaluacioens
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

// Obtener evaluaciones de un empleado
router.get(
  "/employee/:id",
  authenticateAndAuthorizeRoles("Admin", "Manager", "Employee"),
  getEvaluationsByEmployeeId
);

// Ruta para completar una evaluación
router.post(
  "/complete/:assignmentId",
  authenticateAndAuthorizeRoles("Manager", "Employee"),
  completeEvaluation
);

export default router;
