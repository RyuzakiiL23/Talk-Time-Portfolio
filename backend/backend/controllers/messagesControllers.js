import Conversation from "../models/conversation.js";
import Message from "../models/message.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

/**
 * Sends a message to a receiver.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const sendMessage = async (req, res) => {
	try {
		const receiverId = req.params.id;
		const senderId = req.user._id;
		const { message, file } = req.body;

		// Find or create a conversation between the sender and receiver
		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});
		}

		// Create a new message
		const newMessage = new Message({
			senderId,
			receiverId,
			message,
			file,
		});

		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}

		// Save the conversation and new message in parallel
		await Promise.all([conversation.save(), newMessage.save()]);

		// Send the new message to the receiver using Socket.IO
		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

		res.status(201).json(newMessage);
	} catch (error) {
		console.log("Error in sendMessage: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

/**
 * Retrieves the messages between the sender and a chat user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const getMessages = async (req, res) => {
	try {
		const idChatUser = req.params.id;
		const senderId = req.user._id;

		// Find the conversation between the sender and chat user, and populate the messages
		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, idChatUser] },
		}).populate("messages");

		if (!conversation) {
			// If no conversation found, return an empty array
			return res.status(200).json([]);
		}

		const messages = conversation.messages;

		res.status(200).json(messages);
	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};