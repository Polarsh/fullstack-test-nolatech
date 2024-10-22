import { Router } from "express";

import authMiddleware from "../middleware/auth.js";

import { getEmployees } from "../controllers/employeesController.js";

const router = Router();

// Obtener lista de empleados
router.get("", getEmployees);

export default router;
