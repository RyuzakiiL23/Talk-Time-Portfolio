import mongoose from "mongoose";

/**
 * Connects to the MongoDB database.
 * @async
 * @function connectDB
 * @throws {Error} If there is an error connecting to the database.
 */
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MongoDB_URI);
        console.log("MongoDB connected");
    } catch (error) {
        console.log("Error: ", error.message);
        process.exit(1);
    }
};

export default connectDB;