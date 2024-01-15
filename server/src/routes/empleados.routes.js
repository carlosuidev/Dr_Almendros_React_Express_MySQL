import { Router } from "express";
import {
  createEmpleado,
  deleteEmpleado,
  getOneEmpleado,
  getAllEmpleados,
  updateEmpleado,
} from "../controllers/empleados.controller.js";

const router = Router();

// Obtener todos los empleados
router.get("/", getAllEmpleados);

// Obtener un empleado
router.get("/:id", getOneEmpleado);

// Borrar todos los empleados
router.delete("/:id", deleteEmpleado);

// Crear un empleado
router.post("/", createEmpleado);

// Actualizar un empleado
router.patch("/:id", updateEmpleado);

export default router;
