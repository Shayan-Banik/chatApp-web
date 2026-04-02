import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import userModel from "../models/user.model.js";

export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized, No token found" });
    }

    const decodedToken = jwt.verify(token, config.JWT_SECRET);
    if (!decodedToken || !decodedToken.id) {
      return res.status(401).json({ message: "Unauthorized, Invalid token" });
    }

    // Load user from DB to provide full user info (excluding password)
    const user = await userModel.findById(decodedToken.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Unauthorized, User not found" });
    }

    req.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      profile: user.profile,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized: Invalid or expired token",
    });
  }
};
