import express from "express";

import authenticateAndAuthorizeRoles from "../middleware/auth.js";

import { addFeedbackToEvaluationTemplate } from "../controllers/feedbackController.js";
import validateFeedback from "../middleware/validateFeedback.js";

const router = express.Router();

// Añadir un feedback a evaluationtemplate
router.post(
  "",
  authenticateAndAuthorizeRoles("Admin", "Manager", "Employee"),
  validateFeedback,
  addFeedbackToEvaluationTemplate
);

export default router;
