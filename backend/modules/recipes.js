import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String,
    trim: true
  },

  image: {
    type: String,
    trim: true
  },

  ingredients: [
    {
      ingredient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ingredient",
        required: true
      },
      quantity: {
        type: Number,
        default: 1
      },
      unit: {
        type: String,
        trim: true
      },
      optional: {
        type: Boolean,
        default: false
      }
    }
  ],

  instructions: [{
    type: String,
    required: true
  }],

  prepTime: Number,   // minutes
  cookTime: Number,   // minutes
  servings: Number,

  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    default: "easy"
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);
export default Recipe;