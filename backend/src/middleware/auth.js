import jwt from "jsonwebtoken";

// Middleware flexible para autenticar y autorizar roles
const authenticateAndAuthorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // Obtener el token del encabezado de autorización
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({
        error: { message: "Acceso denegado. No hay token proporcionado." },
        data: null,
      });
    }

    try {
      // Verificar el token y obtener el payload
      const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET); // Asume formato "Bearer <token>"

      // Verificar si el rol del usuario está en los roles permitidos
      if (!allowedRoles.includes(decoded.role)) {
        return res.status(403).json({
          error: {
            message: "Acceso denegado. No tienes los permisos necesarios.",
          },
          data: null,
        });
      }

      // Agregar los datos del usuario al request
      req.user = decoded;
      next(); // Continuar con el siguiente middleware o controlador
    } catch (error) {
      res.status(400).json({
        error: { message: "Token no válido", details: error.message },
        data: null,
      });
    }
  };
};

export default authenticateAndAuthorizeRoles;
