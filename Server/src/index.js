import express from "express";
import authRoutes from "./routes/authRoute.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/messageRoutes.js";
import cors from "cors";
import { app, server } from "./lib/socket.js";

import path from "path";

dotenv.config();

// * Path
const __dirname = path.resolve();

// * MiddleWare
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//* Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
}

// * PORT
const PORT = process.env.PORT;

// * Connecting the express
server.listen(PORT, (err) => {
  if (err) {
    console.error("Server is not Connected: ", err.message);
  } else {
    console.log(`Server is running on PORT: ${PORT}`);
    connectDB();
  }
});
