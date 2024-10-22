import { Router } from "express";

import { registerUser, loginUser } from "../controllers/authController.js";

import authenticateAndAuthorizeRoles from "../middleware/auth.js";

import validateUser from "../middleware/validateUser.js";
import validateLogin from "../middleware/validateLogin.js";

const router = Router();

// Ruta para registrar
router.post(
  "/register",
  // authenticateAndAuthorizeRoles("Admin"),
  validateUser, // Valida parametros
  registerUser
);

// Ruta para iniciar sesión
router.post("/login", validateLogin, loginUser);

export default router;
