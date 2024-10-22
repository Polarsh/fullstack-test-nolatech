import Employee from "../models/employeeModel.js";

// Obtener lista de todos los usuarios registrados
export const getEmployees = async (req, res) => {
  try {
    const users = await Employee.find();

    res.status(200).json({
      error: null,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      error: {
        message: "Error al obtener los usuarios",
        details: error.message,
      },
      data: null,
    });
  }
};
