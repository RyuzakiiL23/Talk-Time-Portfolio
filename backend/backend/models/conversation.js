import mongoose from "mongoose";

// Define the conversation schema
const conversationSchema = new mongoose.Schema(
	{
		// Array of participants in the conversation
		participants: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		// Array of messages in the conversation
		messages: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Message",
				default: [],
			},
		],
	},
	{ timestamps: true } // Enable timestamps for createdAt and updatedAt fields
);

// Create the Conversation model using the conversation schema
const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;