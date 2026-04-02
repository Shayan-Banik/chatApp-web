import dotenv from "dotenv";

dotenv.config();

export const config = {
    PORT: process.env.PORT || 8080,
    MONGODB_URL: process.env.MONGODB_URL,

    JWT_SECRET: process.env.JWT_SECRET,
    
    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
}