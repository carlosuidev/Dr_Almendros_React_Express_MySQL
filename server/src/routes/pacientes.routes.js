import { Router } from "express";
import {
  createPaciente,
  deletePaciente,
  getOnePaciente,
  getAllPacientes,
  updatePaciente,
} from "../controllers/pacientes.controller.js";

const router = Router();

router.get("/", getAllPacientes);
router.get("/:id", getOnePaciente);
router.delete("/:id", deletePaciente);
router.post("/", createPaciente);
router.patch("/:id", updatePaciente);

export default router;