import express from "express";
import { analyzeImage } from "../recipe/hugging.js";
import multer from "multer";
import { matchAndRecommend, getRecipeById, searchRecipes, getAllIngredients } from "../recipe/recipesToShow.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/analyze-image", upload.single("image"), analyzeImage);

router.post("/match-and-recommend", matchAndRecommend);

router.get("/search", searchRecipes);

router.get("/ingredients", getAllIngredients);

router.get("/:id", getRecipeById);

export default router;