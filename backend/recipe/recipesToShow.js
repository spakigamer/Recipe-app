
import Fuse from "fuse.js";
import Ingredient from "../modules/ingrediants.js";
import Recipe from "../modules/recipes.js";

export const matchAndRecommend = async (req, res) => {
  try {
    const { tags, data } = req.body;

    let processingTags = [];

    if (data && data.raw && Array.isArray(data.raw)) {
      processingTags = data.raw.map(item => item.label);
    } else if (tags && Array.isArray(tags)) {
      processingTags = tags;
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid data format. Expected 'tags' array or 'data.raw' with labels."
      });
    }

    const normalizedTags = processingTags.map(tag =>
      tag.toLowerCase().trim()
    );

    console.log("Analyzing image tags:", normalizedTags);

    // STEP 1: Load all ingredients
    const allIngredients = await Ingredient.find();

    const fuse = new Fuse(allIngredients, {
      keys: ["name", "aliases"],
      threshold: 0.4
    });

    const matchedIngredients = [];
    const matchedIngredientIds = [];

    normalizedTags.forEach(tag => {
      const result = fuse.search(tag);
      if (result.length > 0) {
        const ingredient = result[0].item;
        matchedIngredients.push(ingredient);
        matchedIngredientIds.push(ingredient._id.toString());
      }
    });

    console.log("Matched ingredients count:", matchedIngredients.length);

    // STEP 2: Fetch recipes that contain at least one matched ingredient
    const recipes = await Recipe.find({
      "ingredients.ingredient": { $in: matchedIngredientIds }
    }).populate("ingredients.ingredient");

    console.log("Recipes with at least one ingredient:", recipes.length);

    // STEP 3: Calculate match score
    const rankedRecipes = recipes.map(recipe => {
      const requiredIngredients = recipe.ingredients.filter(
        i => !i.optional
      );

      const matchedCount = requiredIngredients.filter(i =>
        matchedIngredientIds.includes(i.ingredient._id.toString())
      ).length;

      const score =
        requiredIngredients.length === 0
          ? 0
          : matchedCount / requiredIngredients.length;

      return {
        recipeId: recipe._id,
        title: recipe.title,
        matchScore: Number(score.toFixed(2)),
        totalRequired: requiredIngredients.length,
        matchedCount
      };
    });

    console.log("Ranked recipes count:", rankedRecipes.length);

    // STEP 4: Sort by best match
    const filteredRecipes = rankedRecipes.filter(
      recipe => recipe.matchScore >= 0.5
    );

    console.log("Filtered recipes (>= 50%) count:", filteredRecipes.length);

    filteredRecipes.sort((a, b) => b.matchScore - a.matchScore);

    res.json({
      success: true,
      matchedIngredients,
      recipes: filteredRecipes
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Matching and recommendation failed"
    });
  }
};


export const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findById(id).populate("ingredients.ingredient");

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found"
      });
    }

    res.json({
      success: true,
      recipe
    });

  } catch (error) {
    console.error("Error fetching recipe details:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch recipe details"
    });
  }
};

export default matchAndRecommend;
