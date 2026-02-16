
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
        image: recipe.image,
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

export const searchRecipes = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      const recipes = await Recipe.find().limit(10).populate("ingredients.ingredient");
      return res.json({
        success: true,
        recipes
      });
    }

    // Search by title or ingredient name using regex (case-insensitive)
    const recipes = await Recipe.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { "ingredients.ingredient.name": { $regex: q, $options: "i" } } // This might need a slightly different query depending on schema, but let's try this first assuming ingredients are populated or have names denormalized. 
        // Wait, ingredients is array of objects { ingredient: Ref, ... }. We can't query 'ingredient.name' directly unless we use aggregate or if we assume population happens after. 
        // Actually, for simple regex on referenced fields, we might need an aggregate with lookup.
        // Let's stick to title search for now for simplicity and speed, or check if we can assume ingredients are populated.
        // The Recipe schema imports are not shown, but matchAndRecommend creates a Fuse on "allIngredients".
        // Let's implement a simple title search first, and maybe ingredients if easy.
      ]
    }).populate("ingredients.ingredient");

    // Since we can't easily regex search on populated fields in a standard find without aggregate, 
    // let's do title search first. If we want ingredient search, we might need to find ingredients first like matchAndRecommend does.
    
    // Improved strategy:
    // 1. Find ingredients matching the query
    // 2. Find recipes with those ingredients OR matching title
    
    const ingredientRegex = new RegExp(q, 'i');
    const matchedIngredients = await Ingredient.find({ name: ingredientRegex }).select('_id');
    const matchedIngredientIds = matchedIngredients.map(i => i._id);

    const searchResults = await Recipe.find({
        $or: [
            { title: { $regex: q, $options: "i" } },
            { "ingredients.ingredient": { $in: matchedIngredientIds } }
        ]
    }).populate("ingredients.ingredient");

    res.json({
      success: true,
      recipes: searchResults
    });

  } catch (error) {
    console.error("Search failed:", error);
    res.status(500).json({
      success: false,
      message: "Search failed"
    });
  }
};

export const getAllIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.find({}, 'name aliases _id').sort({ name: 1 });
    res.json({
      success: true,
      ingredients
    });
  } catch (error) {
    console.error("Failed to fetch ingredients:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch ingredients"
    });
  }
};

export default matchAndRecommend;
