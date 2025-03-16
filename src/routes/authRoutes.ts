import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { validateRequest } from "../middleware/validateRequest";
import { authSchema } from "../schema/authSchema";

const router = Router();
const authController = new AuthController();

// * this is need a refactor
// TODO: CREATE THE VALIDATE REQUEST MIDDLEWARE
router.post(
  "/register",
  validateRequest(authSchema.register),
  authController.register
);
router.post("/login", authController.login);

export default router;
