import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL)
        console.log(`MongoDB connected succesfully 🤩✅`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}