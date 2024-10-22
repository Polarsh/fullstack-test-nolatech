import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.js";
import employeesRoutes from "./routes/employees.js";
import evaluationRoutes from "./routes/evaluations.js";

// Config
dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeesRoutes);
app.use("/api/evaluations", evaluationRoutes);

// Puerto del servidor
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});
