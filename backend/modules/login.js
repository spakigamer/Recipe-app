import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    googleId: String,
    email: String,
    name: String,
    picture: String,
});

const loginSchema = mongoose.model("Auth", authSchema);

export default loginSchema;