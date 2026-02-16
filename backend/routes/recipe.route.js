import express from "express";
import { analyzeImage } from "../recipe/hugging.js";
import multer from "multer";
import { matchAndRecommend, getRecipeById } from "../recipe/recipesToShow.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/analyze-image", upload.single("image"), analyzeImage);

router.post("/match-and-recommend", matchAndRecommend);

router.get("/:id", getRecipeById);

export default router;