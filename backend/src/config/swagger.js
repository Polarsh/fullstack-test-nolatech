import swaggerUi from "swagger-ui-express";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Necesario para resolver rutas en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar el archivo JSON de Swagger
const swaggerDocument = JSON.parse(
  readFileSync(path.join(__dirname, "swagger.json"), "utf8")
);

export default function swaggerConfig(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
