import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { validateRequest } from "../middleware/validateRequest";
import { authSchema } from "../schema/authSchema";

const router = Router();
const authController = new AuthController();

router.post(
  "/register",
  validateRequest(authSchema.register),
  authController.register
);

export default router;
