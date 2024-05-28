import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Create a new instance of Socket.IO server and attach it to the HTTP server
const io = new Server(server, {
    cors: {
        origin: ["https://talk-time-mu.vercel.app"],
        methods: ["GET", "POST"]
    }
});

// Store the socket ID of each connected user
const userSocket = {};

// Function to get the socket ID of a receiver based on their ID
export const getReceiverSocketId = (receiverId) => {
    return userSocket[receiverId];
};

// Event handler for new connections
io.on("connection", (socket) => {
    console.log("New connection", socket.id);

    // Get the user ID from the handshake query
    const userId = socket.handshake.query.userId;

    // Store the socket ID of the user
    if (userId) {
        userSocket[userId] = socket.id;
    }

    // Emit the list of online users to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocket));

    // Event handler for disconnections
    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);

        // Remove the user's socket ID from the storage
        delete userSocket[userId];

        // Emit the updated list of online users to all connected clients
        io.emit("getOnlineUsers", Object.keys(userSocket));
    });
});

export { app, server, io };
