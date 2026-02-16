// api/index.js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "../src/routes/auth.route.js"; // Adjust path based on your structure
import mongoConnection from "../src/connections/mongoConnection.js";
import recipeRoutes from "../src/recipes/recipe.route.js"; // Adjust path

dotenv.config();

const app = express();

app.use(cors({
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    origin: ["http://localhost:5173", "http://localhost:5174","https://recipe-app-8ssc-7gcfawhq2-dhruvgoel335-gmailcoms-projects.vercel.app","https://recipe-app-8ssc.vercel.app", "https://recipe-app-lilac-kappa.vercel.app"]
}));
app.use(cookieParser());
app.use(express.json());

// Connect to MongoDB (handle connection properly for serverless)
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  try {
    await mongoConnection();
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

app.use("/api/auth", authRoutes);
app.use("/api/recipe", recipeRoutes);

// Export the Express app as a serverless function
export default async function handler(req, res) {
  await connectDB();
  return app(req, res);
}