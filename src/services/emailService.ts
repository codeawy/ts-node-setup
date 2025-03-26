import nodemailer from "nodemailer";
import { getEnv } from "../utils/validateEnv";
import Mail from "nodemailer/lib/mailer";

export class EmailService {
  private transporter!: nodemailer.Transporter;

  constructor() {
    // Initialize the email transporter
    this.createTransport();
  }

  private async createTransport() {
    const { EMAIL_HOST, EMAIL_PASS, EMAIL_SECURE, EMAIL_USER, EMAIL_PORT } =
      getEnv();

    if (EMAIL_HOST && EMAIL_PASS && EMAIL_SECURE && EMAIL_USER && EMAIL_PORT) {
      this.transporter = nodemailer.createTransport({
        host: EMAIL_HOST,
        port: Number(EMAIL_PORT),
        secure: EMAIL_SECURE === "true",
        auth: {
          user: EMAIL_USER,
          pass: EMAIL_PASS
        }
      } as nodemailer.TransportOptions);

      console.log("Email Service configured!");
    }
  }

  async sendVerificationEmail({
    token,
    email
  }: {
    token: string;
    email: string;
  }) {
    const { PORT, EMAIL_USER, VERIFICATION_TOKEN_EXPIRES } = getEnv();

    const verificationUrl = `http://localhost:${PORT}/api/auth/verify-email?token=${token}`;

    const message: Mail.Options = {
      from: `"Express App" <${EMAIL_USER}>`,
      to: email,
      subject: "Verify Your Email Address",
      text: `Please verify your email address by clicking on the following link: ${verificationUrl}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Email Verification</h2>
          <p>Thank you for registering! Please verify your email address by clicking the button below:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">
              Verify Email
            </a>
          </div>
          <p>If the button doesn't work, you can also click on this link or copy it to your browser:</p>
          <p><a href="${verificationUrl}">${verificationUrl}</a></p>
          <p>This link will expire in ${VERIFICATION_TOKEN_EXPIRES} hours.</p>
          <hr>
          <p style="color: #777; font-size: 12px;">If you didn't create an account, you can safely ignore this email.</p>
        </div>
      `
    };

    try {
      await this.transporter.sendMail(message);
      console.log(`Verification email sent to ${email}`);
      // TODO: show the preview URL (Email Verificaiton)
    } catch (error) {
      console.log(error);
      throw new Error("Failed to send verification email!");
    }
  }
}
