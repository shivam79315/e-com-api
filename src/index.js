import express from "express";
import cors from "cors";
import fs from "fs";
import swagger from "swagger-ui-express";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";

import apiRoutes from "../routes/apiRoutes.js";
import loggerMiddleware from "./middlewares/logger.middleware.js";
import { ApplicationError } from "./error-handler/applicationError.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    createParentPath: true,
  })
);

// CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
  })
);

// Swagger
const apiDocs = JSON.parse(fs.readFileSync("./swagger.json", "utf-8"));
app.use("/api-docs", swagger.serve, swagger.setup(apiDocs));

// Logs
app.use(loggerMiddleware);

// Routes (all centralized)
app.use("/api", apiRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to Ecommerce APIs");
});

// Error handler
app.use((err, req, res, next) => {
  console.log(err);
  if (err instanceof ApplicationError) {
    return res.status(err.code).send(err.message);
  }
  res.status(500).send("Something went wrong, please try later");
});

// 404 handler
app.use((req, res) => {
  res.status(404).send("API not found. Check documentation at /api-docs");
});

export default app;