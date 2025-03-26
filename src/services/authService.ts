import crypto from "crypto";

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
  async register(userData: RegisterData) {
    // Generate verfication token
    const verficationToken = crypto.randomBytes(32).toString("hex");

    // ** communicate with the Model
    const token = "";

    return {
      ...userData,
      token
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
