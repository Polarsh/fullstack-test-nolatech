import { Router } from "express";

import authenticateAndAuthorizeRoles from "../middleware/auth.js";

import {
  getEmployeeById,
  getEmployees,
} from "../controllers/employeesController.js";

const router = Router();

// Obtener lista de empleados
router.get(
  "",
  authenticateAndAuthorizeRoles("Admin", "Manager", "Employee"),
  getEmployees
);

// Obtener evaluaciones de un empleado
router.get(
  "/:id",
  authenticateAndAuthorizeRoles("Admin", "Manager", "Employee"),
  getEmployeeById
);

export default router;
