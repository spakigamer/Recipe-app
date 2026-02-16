import jwt from "jsonwebtoken";
import Auth from "../modules/login.js";
import  logout  from "../auth/logout.js";

const generateAccessToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );
};

export const authMiddleware = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken && !refreshToken) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  if (accessToken) {
    try {
      const decoded = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET
      );

      req.user = decoded;
      return next();
    } catch (err) {
      if (err.name !== "TokenExpiredError") {
        return logout(res);
      }
    }
  }

  if (!refreshToken) {
    return logout(res);
  }

  try {
    const decodedRefresh = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await Auth.findById(decodedRefresh.userId);

    if (!user || user.refreshToken !== refreshToken) {
      return logout(res);
    }

    const newAccessToken = generateAccessToken(user._id);

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    req.user = { userId: user._id };

    return next();

  } catch (err) {
    return logout(res);
  }
};
