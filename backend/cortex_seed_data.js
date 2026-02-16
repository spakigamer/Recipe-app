import mongoose from "mongoose";
import dotenv from "dotenv";
import Ingredient from "./modules/ingrediants.js";
import Recipe from "./modules/recipes.js";

dotenv.config();

const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/recipe-app";

const seedData = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB for seeding...");

    // Clear existing data
    await Ingredient.deleteMany({});
    await Recipe.deleteMany({});
    console.log("Cleared existing ingredients and recipes.");

    // --- Ingredients (50+ items) ---
    const ingredientsData = [
      // Vegetables
      { name: "tomato", category: "vegetable" },
      { name: "onion", category: "vegetable" },
      { name: "garlic", category: "vegetable" },
      { name: "potato", category: "vegetable" },
      { name: "carrot", category: "vegetable" },
      { name: "bell pepper", category: "vegetable" },
      { name: "broccoli", category: "vegetable" },
      { name: "spinach", category: "vegetable" },
      { name: "mushroom", category: "vegetable" },
      { name: "zucchini", category: "vegetable" },
      { name: "cucumber", category: "vegetable" },
      { name: "lettuce", category: "vegetable" },
      { name: "cauliflower", category: "vegetable" },
      { name: "sweet potato", category: "vegetable" },
      { name: "green bean", category: "vegetable" },
      { name: "corn", category: "vegetable" },
      { name: "ginger", category: "vegetable" },
      { name: "chili pepper", category: "vegetable" },
      
      // Fruits
      { name: "lemon", category: "fruit" },
      { name: "lime", category: "fruit" },
      { name: "avocado", category: "fruit" },
      { name: "apple", category: "fruit" },
      { name: "banana", category: "fruit" },

      // Meat & Protein
      { name: "chicken breast", category: "meat" },
      { name: "ground beef", category: "meat" },
      { name: "steak", category: "meat" },
      { name: "pork chop", category: "meat" },
      { name: "bacon", category: "meat" },
      { name: "salmon", category: "meat" },
      { name: "shrimp", category: "meat" },
      { name: "tofu", category: "other" },
      { name: "egg", category: "dairy" },

      // Dairy
      { name: "milk", category: "dairy" },
      { name: "butter", category: "dairy" },
      { name: "heavy cream", category: "dairy" },
      { name: "yogurt", category: "dairy" },
      { name: "cheddar cheese", category: "dairy" },
      { name: "mozzarella cheese", category: "dairy" },
      { name: "parmesan cheese", category: "dairy" },
      { name: "feta cheese", category: "dairy" },

      // Grains
      { name: "pasta", category: "grain" },
      { name: "rice", category: "grain" },
      { name: "flour", category: "grain" },
      { name: "bread", category: "grain" },
      { name: "oats", category: "grain" },
      { name: "tortilla", category: "grain" },
      { name: "quinoa", category: "grain" },

      // Pantry / Spices / Oils
      { name: "olive oil", category: "oil" },
      { name: "vegetable oil", category: "oil" },
      { name: "soy sauce", category: "other" },
      { name: "vinegar", category: "other" },
      { name: "honey", category: "other" },
      { name: "sugar", category: "other" },
      { name: "salt", category: "spice" },
      { name: "black pepper", category: "spice" },
      { name: "basil", category: "herb" },
      { name: "oregano", category: "spice" },
      { name: "cumin", category: "spice" },
      { name: "paprika", category: "spice" },
      { name: "cinnamon", category: "spice" },
      { name: "mayonnaise", category: "other" },
      { name: "mustard", category: "other" },
      { name: "ketchup", category: "other" },
    ];

    const insertedIngredients = await Ingredient.insertMany(ingredientsData);
    console.log(`Seeded ${insertedIngredients.length} ingredients.`);

    // Helper to find ingredient ID by name
    const getIngId = (name) => {
        const ing = insertedIngredients.find(i => i.name === name);
        if (!ing) console.warn(`Warning: Ingredient '${name}' not found.`);
        return ing?._id;
    };

    // --- Recipes (25 items) ---
    const recipesData = [
      {
        title: "Classic Spaghetti Bolognese",
        description: "A rich and hearty pasta dish with a savory meat sauce.",
        image: "https://images.unsplash.com/photo-1626844131082-256783844137?q=80&w=1935&auto=format&fit=crop",
        prepTime: 15,
        cookTime: 45,
        servings: 4,
        difficulty: "medium",
        instructions: [
            "Boil pasta in salted water until al dente.",
            "Sauté onions and garlic in olive oil until soft.",
            "Add ground beef and cook until browned.",
            "Stir in tomatoes (crushed/sauce), oregano, salt, and pepper. Simmer for 20 mins.",
            "Serve sauce over pasta with parmesan cheese."
        ],
        ingredients: [
          { ingredient: getIngId("pasta"), quantity: 400, unit: "g" },
          { ingredient: getIngId("ground beef"), quantity: 500, unit: "g" },
          { ingredient: getIngId("tomato"), quantity: 4, unit: "whole" }, // assuming fresh or can add tomato sauce ing later
          { ingredient: getIngId("onion"), quantity: 1, unit: "whole" },
          { ingredient: getIngId("garlic"), quantity: 2, unit: "cloves" },
          { ingredient: getIngId("olive oil"), quantity: 2, unit: "tbsp" },
        ]
      },
      {
        title: "Simple Tomato Basil Pasta",
        description: "A quick and fresh pasta dish perfect for weeknight dinners.",
        image: "https://images.unsplash.com/photo-1608219992759-8d74ed8d76eb?q=80&w=1974&auto=format&fit=crop",
        prepTime: 10,
        cookTime: 15,
        servings: 2,
        difficulty: "easy",
        instructions: [
            "Cook pasta according to package instructions.",
            "In a pan, heat olive oil and sauté garlic until fragrant.",
            "Add chopped tomatoes and cook until soft.",
            "Toss cooked pasta with the sauce and fresh basil.",
            "Season with salt and pepper."
        ],
        ingredients: [
          { ingredient: getIngId("pasta"), quantity: 200, unit: "g" },
          { ingredient: getIngId("tomato"), quantity: 3, unit: "whole" },
          { ingredient: getIngId("garlic"), quantity: 2, unit: "cloves" },
          { ingredient: getIngId("basil"), quantity: 1, unit: "handful" },
          { ingredient: getIngId("olive oil"), quantity: 2, unit: "tbsp" },
        ]
      },
      {
        title: "Grilled Chicken Salad",
        description: "Healthy and delicious salad with grilled chicken breast.",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1780&auto=format&fit=crop",
        prepTime: 15,
        cookTime: 10,
        servings: 2,
        difficulty: "easy",
        instructions: [
            "Season chicken breast with salt and pepper.",
            "Grill chicken until fully cooked, then slice.",
            "Toss lettuce, tomatoes, and carrots in a bowl.",
            "Top with grilled chicken and drizzle with olive oil.",
        ],
        ingredients: [
          { ingredient: getIngId("chicken breast"), quantity: 2, unit: "pieces" },
          { ingredient: getIngId("lettuce"), quantity: 1, unit: "head" },
          { ingredient: getIngId("tomato"), quantity: 2, unit: "whole" },
          { ingredient: getIngId("carrot"), quantity: 1, unit: "whole" },
          { ingredient: getIngId("olive oil"), quantity: 2, unit: "tbsp" },
        ]
      },
       {
        title: "Cheesy Potato Bake",
        description: "Comfort food at its finest with layers of potato and cheese.",
        image: "https://images.unsplash.com/photo-1518977676601-b53f82a6b6dc?q=80&w=2070&auto=format&fit=crop",
        prepTime: 20,
        cookTime: 60,
        servings: 6,
        difficulty: "medium",
        instructions: [
            "Preheat oven to 375°F (190°C).",
            "Slice potatoes thinly.",
            "Layer potatoes in a baking dish with milk and garlic.",
            "Top with mozzarella and parmesan cheese.",
            "Bake for 1 hour until golden and bubbly."
        ],
        ingredients: [
          { ingredient: getIngId("potato"), quantity: 6, unit: "large" },
          { ingredient: getIngId("milk"), quantity: 1, unit: "cup" },
          { ingredient: getIngId("garlic"), quantity: 2, unit: "cloves" },
          { ingredient: getIngId("mozzarella cheese"), quantity: 200, unit: "g" },
          { ingredient: getIngId("parmesan cheese"), quantity: 50, unit: "g" },
        ]
      },
      // New Recipes
      {
        title: "Garlic Butter Steak Bites",
        description: "Tender steak bites cooked in a rich garlic butter sauce.",
        image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=2070&auto=format&fit=crop",
        prepTime: 10,
        cookTime: 10,
        servings: 2,
        difficulty: "medium",
        instructions: [
            "Cut steak into cubes and season with salt and pepper.",
            "Sear steak cubes in a hot pan with oil.",
            "Add butter and minced garlic to the pan.",
            "Toss steak in the garlic butter until cooked to preference."
        ],
        ingredients: [
            { ingredient: getIngId("steak"), quantity: 500, unit: "g" },
            { ingredient: getIngId("butter"), quantity: 3, unit: "tbsp" },
            { ingredient: getIngId("garlic"), quantity: 4, unit: "cloves" },
            { ingredient: getIngId("oil"), quantity: 1, unit: "tbsp" }, // generic oil or olive oil
        ]
      },
      {
        title: "Vegetable Stir Fry",
        description: "A quick and healthy mix of colorful vegetables.",
        image: "https://images.unsplash.com/photo-1511690656952-34342d5c71df?q=80&w=1964&auto=format&fit=crop",
        prepTime: 15,
        cookTime: 10,
        servings: 3,
        difficulty: "easy",
        instructions: [
            "Chop broccoli, carrots, and bell peppers.",
            "Stir fry vegetables in oil with ginger and garlic.",
            "Add soy sauce and cook until veggies are tender-crisp.",
            "Serve over rice."
        ],
        ingredients: [
            { ingredient: getIngId("broccoli"), quantity: 1, unit: "head" },
            { ingredient: getIngId("carrot"), quantity: 2, unit: "whole" },
            { ingredient: getIngId("bell pepper"), quantity: 1, unit: "whole" },
            { ingredient: getIngId("soy sauce"), quantity: 2, unit: "tbsp" },
            { ingredient: getIngId("ginger"), quantity: 1, unit: "inch" },
            { ingredient: getIngId("rice"), quantity: 1, unit: "cup" },
        ]
      },
      {
        title: "Chicken Fajitas",
        description: "Sizzling chicken with peppers and onions served in tortillas.",
        image: "https://images.unsplash.com/photo-1534938665420-4193effeacc4?q=80&w=2071&auto=format&fit=crop",
        prepTime: 20,
        cookTime: 15,
        servings: 4,
        difficulty: "medium",
        instructions: [
            "Slice chicken, bell peppers, and onions.",
            "Season chicken with cumin and paprika.",
            "Sauté chicken until cooked, then set aside.",
            "Sauté peppers and onions until soft.",
            "Combine and serve in warm tortillas."
        ],
        ingredients: [
            { ingredient: getIngId("chicken breast"), quantity: 500, unit: "g" },
            { ingredient: getIngId("bell pepper"), quantity: 2, unit: "whole" },
            { ingredient: getIngId("onion"), quantity: 1, unit: "large" },
            { ingredient: getIngId("tortilla"), quantity: 8, unit: "count" },
            { ingredient: getIngId("cumin"), quantity: 1, unit: "tsp" },
            { ingredient: getIngId("paprika"), quantity: 1, unit: "tsp" },
        ]
      },
      {
        title: "Oven Roasted Salmon",
        description: "Simple and elegant salmon fillets baked with lemon and herbs.",
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=2070&auto=format&fit=crop",
        prepTime: 5,
        cookTime: 15,
        servings: 2,
        difficulty: "easy",
        instructions: [
            "Place salmon fillets on a baking sheet.",
            "Drizzle with olive oil and squeeze lemon juice over top.",
            "Season with salt, pepper, and herbs.",
            "Bake at 400°F (200°C) for 12-15 minutes."
        ],
        ingredients: [
            { ingredient: getIngId("salmon"), quantity: 2, unit: "fillets" },
            { ingredient: getIngId("lemon"), quantity: 1, unit: "whole" },
            { ingredient: getIngId("olive oil"), quantity: 1, unit: "tbsp" },
            { ingredient: getIngId("salt"), quantity: 1, unit: "pinch" },
        ]
      },
      {
        title: "Creamy Mushroom Risotto",
        description: "Rich and creamy Italian rice dish with mushrooms.",
        image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=2070&auto=format&fit=crop",
        prepTime: 15,
        cookTime: 40,
        servings: 4,
        difficulty: "hard",
        instructions: [
            "Sauté mushrooms and onions in butter.",
            "Add rice and cook for 1 minute.",
            "Gradually add warm broth (or water/stock) stirring constantly.",
            "Cook until rice is creamy and tender.",
            "Stir in parmesan cheese."
        ],
        ingredients: [
            { ingredient: getIngId("rice"), quantity: 1.5, unit: "cup" }, // arborio ideally
            { ingredient: getIngId("mushroom"), quantity: 300, unit: "g" },
            { ingredient: getIngId("onion"), quantity: 1, unit: "whole" },
            { ingredient: getIngId("butter"), quantity: 3, unit: "tbsp" },
            { ingredient: getIngId("parmesan cheese"), quantity: 0.5, unit: "cup" },
        ]
      },
      {
        title: "Fluffy Pancakes",
        description: "Classic breakfast pancakes served with butter and syrup.",
        image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=1980&auto=format&fit=crop",
        prepTime: 10,
        cookTime: 15,
        servings: 4,
        difficulty: "easy",
        instructions: [
            "Mix flour, sugar, baking powder (assume pantry), salt, milk, and egg.",
            "Pour batter onto a hot greased griddle.",
            "Cook until bubbles form, then flip.",
            "Serve warm with butter."
        ],
        ingredients: [
            { ingredient: getIngId("flour"), quantity: 1.5, unit: "cup" },
            { ingredient: getIngId("milk"), quantity: 1.25, unit: "cup" },
            { ingredient: getIngId("egg"), quantity: 1, unit: "whole" },
            { ingredient: getIngId("butter"), quantity: 2, unit: "tbsp" },
            { ingredient: getIngId("sugar"), quantity: 1, unit: "tbsp" },
        ]
      },
      {
        title: "Greek Salad",
        description: "Fresh vegetable salad with feta cheese and olives.",
        image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1974&auto=format&fit=crop",
        prepTime: 15,
        cookTime: 0,
        servings: 2,
        difficulty: "easy",
        instructions: [
            "Chop cucumbers, tomatoes, and onions.",
            "Combine in a bowl with olives (if available) and feta cheese.",
            "Dress with olive oil, vinegar, and oregano.",
            "Toss gently and serve."
        ],
        ingredients: [
            { ingredient: getIngId("cucumber"), quantity: 1, unit: "large" },
            { ingredient: getIngId("tomato"), quantity: 2, unit: "whole" },
            { ingredient: getIngId("onion"), quantity: 0.5, unit: "red" },
            { ingredient: getIngId("feta cheese"), quantity: 100, unit: "g" },
            { ingredient: getIngId("olive oil"), quantity: 2, unit: "tbsp" },
            { ingredient: getIngId("vinegar"), quantity: 1, unit: "tsp" },
             { ingredient: getIngId("oregano"), quantity: 1, unit: "tsp" },
        ]
      },
      {
        title: "Scrambled Eggs on Toast",
        description: "A simple and satisfying breakfast staple.",
        image: "https://images.unsplash.com/photo-1525351484163-7529414395d8?q=80&w=2070&auto=format&fit=crop",
        prepTime: 2,
        cookTime: 5,
        servings: 1,
        difficulty: "easy",
        instructions: [
            "Whisk eggs with a splash of milk and salt.",
            "Cook in a buttered pan over medium heat, stirring gently.",
            "Toast the bread.",
            "Serve eggs on top of the toast."
        ],
        ingredients: [
            { ingredient: getIngId("egg"), quantity: 2, unit: "whole" },
            { ingredient: getIngId("bread"), quantity: 2, unit: "slices" },
            { ingredient: getIngId("milk"), quantity: 1, unit: "tbsp" },
            { ingredient: getIngId("butter"), quantity: 1, unit: "tsp" },
            { ingredient: getIngId("salt"), quantity: 1, unit: "pinch" },
        ]
      },
      {
        title: "Beef Tacos",
        description: "Hard or soft shell tacos filled with seasoned beef and toppings.",
        image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?q=80&w=2070&auto=format&fit=crop",
        prepTime: 15,
        cookTime: 15,
        servings: 4,
        difficulty: "easy",
        instructions: [
            "Cook ground beef in a pan until browned.",
            "Add chili powder/cumin/paprika and a little water.",
            "Simmer until sauce thickens.",
            "Serve in tortillas with lettuce, tomato, and cheese."
        ],
        ingredients: [
            { ingredient: getIngId("ground beef"), quantity: 500, unit: "g" },
            { ingredient: getIngId("tortilla"), quantity: 8, unit: "shells" },
            { ingredient: getIngId("lettuce"), quantity: 1, unit: "cup" },
            { ingredient: getIngId("tomato"), quantity: 1, unit: "large" },
            { ingredient: getIngId("cheddar cheese"), quantity: 1, unit: "cup" },
            { ingredient: getIngId("cumin"), quantity: 1, unit: "tsp" },
        ]
      },
      {
        title: "Honey Garlic Chicken",
        description: "Sweet and savory chicken thighs cooked to perfection.",
        image: "https://images.unsplash.com/photo-1627744315449-36864353f475?q=80&w=1974&auto=format&fit=crop",
        prepTime: 10,
        cookTime: 20,
        servings: 4,
        difficulty: "medium",
        instructions: [
            "Season chicken thighs with salt and pepper.",
            "Sear chicken in a pan until golden.",
            "Mix honey, soy sauce, and garlic.",
            "Pour sauce over chicken and simmer until cooked through."
        ],
        ingredients: [
            { ingredient: getIngId("chicken breast"), quantity: 4, unit: "thighs" }, // using breast as placeholder if thighs not in ingest
            { ingredient: getIngId("honey"), quantity: 0.3, unit: "cup" },
            { ingredient: getIngId("soy sauce"), quantity: 0.25, unit: "cup" },
            { ingredient: getIngId("garlic"), quantity: 3, unit: "cloves" },
        ]
      },
      {
        title: "Cauliflower Steaks",
        description: "Roasted cauliflower slices seasoned with spices.",
        image: "https://images.unsplash.com/photo-1615829910899-0487373c0905?q=80&w=1973&auto=format&fit=crop",
        prepTime: 10,
        cookTime: 25,
        servings: 2,
        difficulty: "easy",
        instructions: [
            "Slice cauliflower into thick 'steaks'.",
            "Brush with olive oil and sprinkle with paprika and garlic.",
            "Roast at 400°F (200°C) for 20-25 minutes.",
            "Flip halfway through cooking."
        ],
        ingredients: [
            { ingredient: getIngId("cauliflower"), quantity: 1, unit: "head" },
            { ingredient: getIngId("olive oil"), quantity: 2, unit: "tbsp" },
            { ingredient: getIngId("paprika"), quantity: 1, unit: "tsp" },
        ]
      },
      {
        title: "Avocado Toast",
        description: "Trendy and delicious toasted bread topped with smashed avocado.",
        image: "https://images.unsplash.com/photo-1588137372308-15f75323ca8d?q=80&w=1974&auto=format&fit=crop",
        prepTime: 5,
        cookTime: 2,
        servings: 1,
        difficulty: "easy",
        instructions: [
            "Toast the bread slices.",
            "Mash avocado with lime juice, salt, and pepper.",
            "Spread onto toast.",
             "Optional: Top with an egg."
        ],
        ingredients: [
            { ingredient: getIngId("bread"), quantity: 2, unit: "slices" },
            { ingredient: getIngId("avocado"), quantity: 1, unit: "whole" },
            { ingredient: getIngId("lime"), quantity: 0.5, unit: "fruit" },
            { ingredient: getIngId("salt"), quantity: 1, unit: "pinch" },
        ]
      },
      {
        title: "Shrimp Scampi",
        description: "Shrimp cooked in a garlic butter and lemon sauce, served over pasta.",
        image: "https://images.unsplash.com/photo-1625944525533-472f083d363f?q=80&w=1974&auto=format&fit=crop",
        prepTime: 10,
        cookTime: 10,
        servings: 2,
        difficulty: "medium",
        instructions: [
            "Cook pasta.",
            "Sauté garlic in butter and olive oil.",
            "Add shrimp and cook until pink.",
            "Stir in lemon juice and parsley (if avail).",
            "Toss with pasta."
        ],
        ingredients: [
            { ingredient: getIngId("shrimp"), quantity: 300, unit: "g" },
            { ingredient: getIngId("pasta"), quantity: 200, unit: "g" },
            { ingredient: getIngId("butter"), quantity: 2, unit: "tbsp" },
            { ingredient: getIngId("garlic"), quantity: 3, unit: "cloves" },
            { ingredient: getIngId("lemon"), quantity: 1, unit: "whole" },
        ]
      },
       {
        title: "Oatmeal with Fruit",
        description: "Warm bowl of oats topped with fresh bananas and honey.",
        image: "https://images.unsplash.com/photo-1517673400267-025144092806?q=80&w=2070&auto=format&fit=crop",
        prepTime: 2,
        cookTime: 5,
        servings: 1,
        difficulty: "easy",
        instructions: [
            "Cook oats with water or milk.",
            "Slice banana.",
            "Top oatmeal with banana slices and drizzle with honey."
        ],
        ingredients: [
             { ingredient: getIngId("oats"), quantity: 0.5, unit: "cup" },
             { ingredient: getIngId("milk"), quantity: 1, unit: "cup" },
             { ingredient: getIngId("banana"), quantity: 1, unit: "whole" },
             { ingredient: getIngId("honey"), quantity: 1, unit: "tbsp" },
        ]
      },
      {
        title: "Fried Rice",
        description: "A great way to use up leftover rice and vegetables.",
        image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=2072&auto=format&fit=crop",
        prepTime: 10,
        cookTime: 10,
        servings: 3,
        difficulty: "medium",
        instructions: [
            "Scramble eggs in a pan and set aside.",
            "Sauté onions, carrots, and peas (if avail) in oil.",
            "Add cold rice and soy sauce, stir frying constantly.",
            "Mix in eggs and serve."
        ],
        ingredients: [
            { ingredient: getIngId("rice"), quantity: 3, unit: "cups" }, // cooked
            { ingredient: getIngId("egg"), quantity: 2, unit: "whole" },
            { ingredient: getIngId("soy sauce"), quantity: 2, unit: "tbsp" },
            { ingredient: getIngId("onion"), quantity: 1, unit: "small" },
            { ingredient: getIngId("carrot"), quantity: 1, unit: "small" },
        ]
      },
       {
        title: "Baked Sweet Potato",
        description: "Whole sweet potato baked until tender.",
        image: "https://images.unsplash.com/photo-1596097635121-14b63b7f6c19?q=80&w=2070&auto=format&fit=crop",
        prepTime: 2,
        cookTime: 45,
        servings: 1,
        difficulty: "easy",
        instructions: [
            "Prick sweet potato with a fork.",
            "Bake at 400°F (200°C) for 45-60 minutes.",
            "Split open and serve with butter."
        ],
        ingredients: [
            { ingredient: getIngId("sweet potato"), quantity: 1, unit: "whole" },
            { ingredient: getIngId("butter"), quantity: 1, unit: "tbsp" },
        ]
      },
      {
        title: "Cucumber Salad",
        description: "Crisp and refreshing side salad.",
        image: "https://images.unsplash.com/photo-1605896324901-d703b4172f3e?q=80&w=1964&auto=format&fit=crop",
        prepTime: 10,
        cookTime: 0,
        servings: 2,
        difficulty: "easy",
        instructions: [
            "Slice cucumbers thinly.",
            "Toss with vinegar, sugar, salt, and pepper.",
            "Chill before serving."
        ],
        ingredients: [
            { ingredient: getIngId("cucumber"), quantity: 2, unit: "whole" },
            { ingredient: getIngId("vinegar"), quantity: 2, unit: "tbsp" },
            { ingredient: getIngId("sugar"), quantity: 1, unit: "tsp" },
            { ingredient: getIngId("onion"), quantity: 0.25, unit: "slices" },
        ]
      },
      {
        title: "Garlic Bread",
        description: "Toasted bread with garlic butter spread.",
        image: "https://images.unsplash.com/photo-1573140247632-f84660f67627?q=80&w=2070&auto=format&fit=crop",
        prepTime: 5,
        cookTime: 10,
        servings: 4,
        difficulty: "easy",
        instructions: [
            "Mix softened butter with minced garlic and parsley.",
            "Spread onto bread slices.",
            "Bake until golden and crispy."
        ],
        ingredients: [
            { ingredient: getIngId("bread"), quantity: 1, unit: "loaf" },
            { ingredient: getIngId("butter"), quantity: 0.5, unit: "cup" },
            { ingredient: getIngId("garlic"), quantity: 3, unit: "cloves" },
        ]
      },
      {
        title: "Cinnamon Sugar Toast",
        description: "Sweet and crunchy breakfast treat.",
        image: "https://images.unsplash.com/photo-1584776293029-78c521855b71?q=80&w=1974&auto=format&fit=crop",
        prepTime: 2,
        cookTime: 3,
        servings: 1,
        difficulty: "easy",
        instructions: [
            "Toast bread.",
            "Butter the toast while hot.",
            "Sprinkle generously with cinnamon and sugar mix."
        ],
        ingredients: [
            { ingredient: getIngId("bread"), quantity: 2, unit: "slices" },
            { ingredient: getIngId("butter"), quantity: 1, unit: "tbsp" },
            { ingredient: getIngId("sugar"), quantity: 1, unit: "tsp" },
            { ingredient: getIngId("cinnamon"), quantity: 0.5, unit: "tsp" },
        ]
      },
       {
        title: "Lemon Garlic Shrimp Pasta",
        description: "Zesty pasta dish with succulent shrimp.",
        image: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?q=80&w=2070&auto=format&fit=crop",
        prepTime: 10,
        cookTime: 15,
        servings: 2,
        difficulty: "medium",
        instructions: [
            "Cook pasta.",
            "Sauté shrimp in olive oil and garlic.",
            "Toss pasta with shrimp, lemon juice, and parmesan.",
        ],
        ingredients: [
            { ingredient: getIngId("pasta"), quantity: 200, unit: "g" },
            { ingredient: getIngId("shrimp"), quantity: 200, unit: "g" },
            { ingredient: getIngId("garlic"), quantity: 2, unit: "cloves" },
            { ingredient: getIngId("lemon"), quantity: 1, unit: "whole" },
            { ingredient: getIngId("parmesan cheese"), quantity: 0.25, unit: "cup" },
        ]
      },
      {
        title: "Apple Slices with Honey",
        description: "Simple healthy snack.",
        image: "https://images.unsplash.com/photo-1568564321589-3e581d074f9b?q=80&w=1974&auto=format&fit=crop",
        prepTime: 5,
        cookTime: 0,
        servings: 1,
        difficulty: "easy",
        instructions: [
            "Slice apple.",
            "Drizzle with honey.",
            "Serve immediately."
        ],
        ingredients: [
            { ingredient: getIngId("apple"), quantity: 1, unit: "whole" },
            { ingredient: getIngId("honey"), quantity: 1, unit: "tbsp" },
        ]
      }
    ];

    // Filter out undefined ingredients just in case
    const validRecipes = recipesData.map(recipe => ({
        ...recipe,
        ingredients: recipe.ingredients.filter(i => {
            if(!i.ingredient) console.log(`Missing ingredient ID in recipe: ${recipe.title}`);
            return i.ingredient;
        })
    }));

    const insertedRecipes = await Recipe.insertMany(validRecipes);
    console.log(`Seeded ${insertedRecipes.length} recipes.`);

    console.log("✅ Expanded Database seeding completed successfully!");
    mongoose.connection.close();
    process.exit(0);

  } catch (error) {
    console.error("❌ Seeding failed:", error);
    mongoose.connection.close();
    process.exit(1);
  }
};

seedData();
