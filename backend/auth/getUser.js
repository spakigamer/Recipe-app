
import loginSchema from "../modules/login.js";

export const getUser = async (req, res) => {
  try {
    const user = await loginSchema.findById(req.user.userId).populate('cookedRecipes');

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      status: "success",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        googleId: user.googleId,
        cookedRecipes: user.cookedRecipes
      },
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
