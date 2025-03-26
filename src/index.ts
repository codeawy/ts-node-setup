import express, {
  Express,
  NextFunction,
  Request,
  Response,
  ErrorRequestHandler
} from "express";
import rootRouter from "./routes";
import { HttpError } from "./utils/errors";
import { validateEnv } from "./utils/validateEnv";

validateEnv();

const app: Express = express();

const PORT = parseInt(process.env.PORT || "5000", 10);

app.use(express.json());

app.use("/api", rootRouter);

// Global error handler middleware
const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  if (err instanceof HttpError) {
    res.status(err.statusCode).json({
      status: "error",
      message: err.message,
      errors: err.errors
    });
  } else {
    // Default error handling for unexpected errors
    res.status(500).json({
      status: "error",
      message: "Something went wrong",
      ...(process.env.NODE_ENV === "development"
        ? { details: err.message }
        : {})
    });
  }
};

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at: http://localhost:${PORT}`);
});
