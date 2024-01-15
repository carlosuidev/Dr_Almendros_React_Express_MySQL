import { Router } from "express";
import {
  createCita,
  deleteCita,
  getOneCita,
  getAllCitas,
  updateCita,
  getCitasEmpleado,
  getCitasPaciente,
} from "../controllers/citas.controller.js";

const router = Router();

router.get("/", getAllCitas);
router.get("/:id", getOneCita);
router.delete("/:id", deleteCita);
router.post("/", createCita);
router.patch("/:id", updateCita);
router.get("/empleados/:id", getCitasEmpleado);
router.get("/pacientes/:id", getCitasPaciente);

export default router;