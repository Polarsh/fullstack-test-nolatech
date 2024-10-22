import express from "express";

import authenticateAndAuthorizeRoles from "../middleware/auth.js";
import { getReportForEmployee } from "../controllers/reportController.js";

const router = express.Router();

// Generar reporte de evaluación para un empleado
router.get(
  "/employee/:id",
  authenticateAndAuthorizeRoles("Admin", "Manager", "Employee"),
  getReportForEmployee
);

export default router;
