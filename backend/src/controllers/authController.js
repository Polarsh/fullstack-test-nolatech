import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { startSession } from "mongoose";

import User from "../models/userModel.js";
import Employee from "../models/employeeModel.js";

// Registrar usuario
export const registerUser = async (req, res) => {
  const { name, email, position, phone, department, role } = req.body;
  const defaultPassword = process.env.DEFAULT_PASSWORD;

  try {
    // Verificar si el usuario ya existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        error: { message: "El usuario ya existe", code: "USER_EXISTS" },
        data: null,
      });
    }

    // Crear el usuario
    const newUser = new User({
      name,
      email,
      password: defaultPassword,
      role,
    });

    await newUser.save();

    // Crear el empleado
    const newEmployee = new Employee({
      name,
      email,
      phone,
      role,
      position,
      department,
      userId: newUser._id,
    });

    await newEmployee.save();

    res.status(201).json({
      error: null,
      data: {
        message: "Usuario creado correctamente",
        user: { name: newUser.name, email: newUser.email, role: newUser.role },
        employee: newEmployee,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: {
        message: "Error al registrar usuario y empleado",
        details: error.message,
      },
      data: null,
    });
  }
};

// Iniciar sesión
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        error: { message: "Usuario no encontrado", code: "USER_NOT_FOUND" },
        data: null,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        error: { message: "Contraseña incorrecta", code: "INVALID_PASSWORD" },
        data: null,
      });
    }

    const employee = await Employee.findOne({ email });

    if (!employee) {
      return res.status(400).json({
        error: { message: "Empleado no encontrado", code: "USER_NOT_FOUND" },
        data: null,
      });
    }

    const token = jwt.sign(
      { email: user.email, role: user.role, employeeId: employee.id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      error: null,
      data: { token, message: "Inicio de sesión exitoso" },
    });
  } catch (error) {
    res.status(500).json({
      error: { message: "Error al iniciar sesión", details: error.message },
      data: null,
    });
  }
};
