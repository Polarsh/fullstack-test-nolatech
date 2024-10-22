import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.js";
import employeesRoutes from "./routes/employees.js";
import evaluationRoutes from "./routes/evaluations.js";
import feedbackRoutes from "./routes/feedback.js";
import reportRoutes from "./routes/reports.js";

const app = express();

// Config
dotenv.config();
connectDB();

// Configurar CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Asegúrate de que el origen sea el correcto
    methods: "GET,POST,PUT,DELETE,OPTIONS", // Agregar OPTIONS aquí también
    allowedHeaders: "Content-Type, Authorization", // Asegúrate de permitir estos encabezados
    credentials: true, // Permitir el uso de cookies, tokens, etc.
  })
);

// Manejo de preflight requests
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(200);
});

// Middlewares
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeesRoutes);
app.use("/api/evaluations", evaluationRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/reports", reportRoutes);

// Puerto del servidor
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});
