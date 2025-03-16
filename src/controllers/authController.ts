import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/authService";

// ** Handle the HTTP requests
export class AuthController {
  private authService = new AuthService();

  // * Create a new user => request body =>  HTTP Method => POST
  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData = req.body;
      const registeredUser = await this.authService.register(userData);

      res.status(200).json({
        message: "User has been created successfully!",
        data: { ...registeredUser }
      });
    } catch (error) {
      console.error(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData = req.body;
      const loggedInUser = await this.authService.login(userData);

      res.status(200).json({
        message: "Logged in successfully!",
        data: { ...loggedInUser }
      });
    } catch (error) {
      console.log("ERROR", error);
    }
  };
}
