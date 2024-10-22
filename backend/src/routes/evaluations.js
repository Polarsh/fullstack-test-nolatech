import express from "express";

import {
  createEvaluationTemplate,
  getEvaluationTemplateById,
  updateEvaluationTemplate,
} from "../controllers/evaluationController.js";

import authenticateAndAuthorizeRoles from "../middleware/auth.js";

const router = express.Router();

// Crear una nueva evaluación
router.post(
  "",
  authenticateAndAuthorizeRoles("Admin", "Manager"),
  createEvaluationTemplate
);

// Actualizar una evaluación
router.put(
  "/:id",
  authenticateAndAuthorizeRoles("Admin", "Manager"),
  updateEvaluationTemplate
);

// Obtener una evaluación
router.get(
  "/:id",
  authenticateAndAuthorizeRoles("Admin", "Manager"),
  getEvaluationTemplateById
);

export default router;
