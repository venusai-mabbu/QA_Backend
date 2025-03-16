import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import faqRoutes from "./routes/faqRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Use the single FAQ routes file
app.use("/api/faqs", faqRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((error) => console.error("MongoDB Connection Failed:", error));
