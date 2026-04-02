import userModel from "../models/user.model.js";
import messageModel from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getUser = async (req, res) => {
  try {
    const loggedInUser = req.user.id;

    const filteredUsers = await userModel
      .find({ _id: { $ne: loggedInUser } }) // ✅ database field
      .select("-password");

    res.status(200).json({
      message: "Users fetched successfully",
      users: filteredUsers,
    });
  } catch (error) {
    console.log("error in getting users", error.message);
    res.status(400).json({ message: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params; // logged in user id
    const myId = req.user.id; // my id

    const messages = await messageModel
      .find({
        $or: [
          { sender: myId, receiver: userToChatId },
          { sender: userToChatId, receiver: myId },
        ],
      })
      .sort({ createdAt: 1 });

    res.status(200).json({
      message: "Messages fetched successfully",
      messages,
    });
  } catch (error) {
    console.log("error in getting messages", error.message);
    res.status(400).json({ message: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user.id;

    let imageUrl;

    if (image) {
      const sendImage = await cloudinary.uploader.upload(image);
      imageUrl = sendImage.secure_url;
    }

    const newMessage = await messageModel.create({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    // todo socket.io implement

    res.status(201).json({
      message: "Message sent successfully",
      message: newMessage,
    });
  } catch (error) {
    console.log("error in sending message ❌", error.message);
    res.status(400).json({ message: "Internal server error" });
  }
};
