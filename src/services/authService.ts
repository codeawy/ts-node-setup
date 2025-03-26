import crypto from "crypto";
import { getEnv } from "../utils/validateEnv";
import { EmailService } from "./emailService";

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

export class AuthService {
  private emailService = new EmailService();

  async register(userData: RegisterData) {
    // Generate verfication token
    const verficationToken = crypto.randomBytes(32).toString("hex");

    // Calc token expiry (default: 24 hours)
    const { VERIFICATION_TOKEN_EXPIRES } = getEnv();
    const expiryHours = parseInt(VERIFICATION_TOKEN_EXPIRES, 10) || 24;
    const verficationTokenExpires = new Date();
    verficationTokenExpires.setHours(
      verficationTokenExpires.getHours() + expiryHours
    );

    // Send verification email
    await this.emailService.sendVerificationEmail({
      token: verficationToken,
      email: userData.email
    });

    return {
      ...userData,
      message:
        "Registration successful. Please check your email to verify your account."
    };
  }

  async login(userData: LoginData) {
    // ** communicate with the Model
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30";

    if (userData.email !== "user@user.com") {
      throw new Error("User does not exists!");
    }

    return {
      ...userData,
      token
    };
  }
}
