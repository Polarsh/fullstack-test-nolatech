# Fullstack Test - Nolatech

Este es un proyecto Fullstack que consta de un **backend** desarrollado con Node.js y Express, y un **frontend** construido con React y Vite. El sistema permite la gestión de usuarios, creación y edición de plantillas de evaluación, asignación de evaluaciones, y seguimiento de evaluaciones pendientes y completadas.

## Requisitos previos

- **Node.js** v14 o superior
- **MongoDB** en ejecución local (u otro servidor MongoDB)
- **NPM** v6 o superior

## Instalación

Para instalar y configurar el proyecto, sigue los siguientes pasos:

### 1. Clonar el repositorio

```bash
git clone https://github.com/Polarsh/fullstack-test-nolatech.git
cd fullstack-test-nolatech
```

### 2. Instalación de dependencias

Ejecuta el siguiente comando desde la carpeta raíz para instalar las dependencias tanto del frontend como del backend:

```bash
npm run install:all
```

### 3. Variables de entorno

Configura las variables de entorno creando archivos `.env` en las carpetas `backend` y `frontend` con los siguientes valores:

#### Backend (`backend/.env`)

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/nolatech_test
GEN_SALT=10
JWT_SECRET=nolatech_jwt_key
DEFAULT_PASSWORD=nolatech
```

#### Frontend (`frontend/.env`)

```
VITE_APP_API_URL=http://localhost:3000
```

### 4. Iniciar el proyecto

Puedes iniciar tanto el frontend como el backend con un solo comando desde la carpeta raíz:

```bash
npm run start:all
```

Esto ejecutará el backend en `http://localhost:3000` y el frontend en `http://localhost:5173`.

## Estructura del proyecto

### Backend (`/backend`)

El backend está construido usando **Express** y se conecta a una base de datos MongoDB. Se utilizan JWT para la autenticación de usuarios y bcrypt para el hash de contraseñas.

#### Estructura:

- **/controllers**: Contiene los controladores para las rutas del backend, encargados de manejar la lógica de negocio.
- **/middleware**: Contiene middlewares para la autenticación y validaciones.
- **/models**: Contiene los modelos de Mongoose para MongoDB.
- **/routes**: Define las rutas de la API para manejar usuarios, plantillas de evaluación y asignaciones.

### Frontend (`/frontend`)

El frontend está construido usando **React** y **Vite**. Implementa una interfaz de usuario moderna y responsiva para la gestión de evaluaciones y usuarios.

### Estructura del frontend

La estructura del proyecto frontend está organizada de la siguiente manera:

- **/context**: Contiene los contextos de React para manejar la autenticación de usuarios y la gestión de evaluaciones.
- **/layout**: Incluye los componentes principales de la interfaz, como el `Sidebar`, `Navbar`, y otras partes comunes de la estructura de la aplicación.
- **/modules**: Se organiza por módulos (users, auth, evaluations), donde cada uno contiene los `services` y esquemas de validación (`schemas`).
- **/routes**: Aquí se configuran las rutas de la aplicación, incluyendo la protección de rutas mediante autenticación.
- **/shared**: Contiene componentes reutilizables (botones, inputs) y gráficos (`charts`) usados en toda la aplicación.
- **/views**: Define las páginas o vistas principales de la aplicación, cada una correspondiente a una pantalla de la interfaz.

## Suposiciones del proyecto

- **Roles**: Se han definido tres roles:
  - **Admin**:  Es el encargado de gestionar usuarios.
  - **Manager**: Los managers pueden crear y editar plantillas de evaluación, asignar evaluaciones y también ser evaluados.
  - **Employee**: Los empleados solo responden las evaluaciones asignadas..
- **Evaluaciones**: Tanto managers como empleados pueden ser evaluados, pero solo los managers pueden crear y asignar plantillas de evaluación. Los empleados simplemente completan las evaluaciones que les han asignado.
- **Feedbacks**: Los feedbacks están asociados a las plantillas de evaluación, no a los evaluados.

## Scripts

- **`npm run install:all`**: Instala las dependencias del frontend y backend.
- **`npm run start:backend`**: Inicia el servidor backend en modo de desarrollo.
- **`npm run start:frontend`**: Inicia el servidor frontend en modo de desarrollo.
- **`npm run start:all`**: Inicia simultáneamente el backend y frontend.

