import cors from "cors";
import cookieParser from 'cookie-parser';
import express from "express";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true, // Corrected typo
}));

app.use(express.json({ limit: "18kb" }));
app.use(express.urlencoded({
    extended: true, // Corrected typo
    limit: "16kb" 
}));
app.use(express.static("public"));
app.use(cookieParser());

// Routes import
import userRouter from "./routes/user.routes.js";

// Routes declaration
app.use("/api/v1/users", userRouter);

export { app };




