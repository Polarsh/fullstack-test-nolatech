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
        message: "Error al obtener los empleados",
        details: error.message,
      },
      data: null,
    });
  }
};

// Obtener una empleado or ID
export const getEmployeeById = async (req, res) => {
  const { id: employeeId } = req.params;

  try {
    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).json({
        error: { message: "Empleado no encontrada." },
        data: null,
      });
    }

    res.status(200).json({
      error: null,
      data: {
        message: "Empleado encontrado.",
        data: employee,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: {
        message: "Error al obtener el empleado.",
        details: error.message,
      },
      data: null,
    });
  }
};
