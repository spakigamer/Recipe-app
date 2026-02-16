import User from "../modules/login.js";

export const markRecipeAsCooked = async (req, res) => {
  try {
    const userId = req.user.userId; // From authMiddleware
    const { recipeId } = req.body;

    if (!recipeId) {
        return res.status(400).json({ success: false, message: "Recipe ID is required" });
    }

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
    }

    // Check if already marked
    if (!user.cookedRecipes.includes(recipeId)) {
        user.cookedRecipes.push(recipeId);
        await user.save();
        return res.json({ success: true, message: "Recipe marked as cooked!", cookedRecipes: user.cookedRecipes });
    } else {
        return res.json({ success: true, message: "Recipe already marked as cooked.", cookedRecipes: user.cookedRecipes });
    }

  } catch (error) {
    console.error("Error marking recipe as cooked:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
