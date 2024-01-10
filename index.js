import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./router/users.js";
import authRoutes from "./router/auth.js";

const app = express();
app.use(bodyParser.json({ limit: "300mb", extended: true }));
app.use(bodyParser.urlencoded({ extended: true, limit: "300mb" }));
// app.use(express.json())
app.use(cors());

const PORT = process.env.port || 6010;
const CONNECTION_URL =
  "mongodb+srv://ajiteshsr615:Ajitesh601@cluster0.oyphj9d.mongodb.net/?retryWrites=true&w=majority";

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

mongoose
  .connect(CONNECTION_URL)
  .then(() => {
    const server = app.listen(PORT, () =>
      console.log("Server is listening on port", PORT)
    );
  })
  .catch((err) => console.log("Error connecting to port"));
