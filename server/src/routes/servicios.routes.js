import { Router } from "express";
import {
  createServicio,
  deleteServicio,
  getOneServicio,
  getAllServicios,
  updateServicio,
} from "../controllers/servicios.controller.js";

const router = Router();

router.get("/", getAllServicios);
router.get("/:id", getOneServicio);
router.delete("/:id", deleteServicio);
router.post("/", createServicio);
router.patch("/:id", updateServicio);

export default router;