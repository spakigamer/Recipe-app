import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    googleId: String,
    email: String,
    name: String,
    picture: String,
    cookedRecipes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe"
    }],
});

const loginSchema = mongoose.model("Auth", authSchema);

export default loginSchema;