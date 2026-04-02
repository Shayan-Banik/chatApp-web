import bcrypt from "bcryptjs";
import userModel from "../models/user.model.js";

import { generateToken } from "../utils/TokenGenerate.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please add all fields");
    }

    if (password.length < 6) {
      res.status(400).json({
        message: "Password must be up to 6 characters",
      });
    }

    const userExists = await userModel.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        profile: newUser.profile,
      });
    } else {
      res.status(400).json({
        message: "Invalid user data",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
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
    res.status(200).json({
      message: "Login successful 🤩",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profile: user.profile,
      },
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: "Internal server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    if (!req.user || req.user.id) {
      res.status(400).json({
        message: "Authorization failed",
      });
    }

    const { profile } = req.body;

    if (!profile) {
      res.status(400).json({
        message: "Please provide a profile",
      });
    }

    const userId = await userModel.findById(req.user.id).select("-password");

    if (!userId) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const uploadImage = await cloudinary.uploader.upload(profile, {
      upload_preset: "profile",
    });
    const updatedUserProfile = await userModel.findByIdAndUpdate(
      userId,
      { profile: uploadImage.secure_url },
      { new: true },
    );

    res.status(200).json({
      message: "Profile updated successfully",
      updatedUserProfile,
    });
  } catch (error) {
    console.log("Error in updating profile image", error.message);
    res.status(400).json({ message: "Internal server error" });
  }
};

export const checkAuth = async (req, res) => {
  try {
    res.status(200).json({
      message: "User is authenticated",
      user: req.user,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: "Internal server error" });
  }
};
