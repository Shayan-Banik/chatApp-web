import bcrypt from "bcryptjs";
import userModel from "../models/user.model.js";

import { generateToken } from "../utils/TokenGenerate.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please add all fields",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const userExists = await userModel.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    generateToken(newUser._id, res);

    return res.status(201).json({
      message: "Account created successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        profile: newUser.profile,
      },
    });
  } catch (error) {
    console.log("Signup error:", error.message);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    generateToken(user._id, res);

    return res.status(200).json({
      message: "Login successful 🤩",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profile: user.profile,
      },
    });
  } catch (error) {
    console.log("Login error:", error.message);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    console.log("Logout error:", error.message);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: "Authorization failed",
      });
    }

    const { profile } = req.body;

    if (!profile) {
      return res.status(400).json({
        message: "Please provide a profile",
      });
    }

    const user = await userModel.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const uploadImage = await cloudinary.uploader.upload(profile);

    const updatedUserProfile = await userModel
      .findByIdAndUpdate(
        req.user.id,
        { profile: uploadImage.secure_url },
        { new: true }
      )
      .select("-password");

    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUserProfile,
    });
  } catch (error) {
    console.log("Error in updating profile image:", error.message);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User is authenticated",
      user,
    });
  } catch (error) {
    console.log("CheckAuth error:", error.message);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
