import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // canonical name
    lowercase: true,
    trim: true
  },

  aliases: [{
    type: String,
    lowercase: true,
    trim: true
  }],

  category: {
    type: String,
    enum: [
      "vegetable",
      "fruit",
      "meat",
      "dairy",
      "grain",
      "spice",
      "herb",
      "oil",
      "other"
    ],
    default: "other"
  },

  embedding: {
    type: [Number], // store semantic embedding vector
    default: []
  },

});
const Ingredient = mongoose.model("Ingredient", ingredientSchema);
export default Ingredient;

