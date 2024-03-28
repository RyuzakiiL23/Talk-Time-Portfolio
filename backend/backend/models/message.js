import mongoose from "mongoose";

// Define the message schema
const messageSchema = new mongoose.Schema(
    {
        // The ID of the sender user
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        // The ID of the receiver user
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        // The content of the message
        message: {
            type: String,
            required: true,
        },
        // The file attached to the message (optional)
        file: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

// Create the Message model using the message schema
const Message = mongoose.model("Message", messageSchema);

// Export the Message model
export default Message;