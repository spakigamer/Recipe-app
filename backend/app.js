import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import mongoConnection from "./connections/mongoConnection.js";
import recipeRoutes from "./routes/recipe.route.js";

dotenv.config();

const app = express();

app.use(cors({
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    origin: ["http://localhost:5173", "http://localhost:5174","https://recipe-app-8ssc.vercel.app"]
}));
app.use(cookieParser());
app.use(express.json());

mongoConnection();

app.use("/api/auth", authRoutes);
app.use("/api/recipe", recipeRoutes);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});