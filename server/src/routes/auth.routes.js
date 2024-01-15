import { Router } from "express";
import {
  loginEmployee,
  updatePassword,
  emailEmployee
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/login", loginEmployee);
router.patch("/password/:id", updatePassword);
router.get("/check-mail/:email", emailEmployee);

export default router;