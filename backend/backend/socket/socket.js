import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();


const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin:["http://localhost:3000"],
        methods: ["GET", "POST"]
    }
});

export const getReceiverSocketId = (receiverId) => {
	return userSocket[receiverId];
};


const userSocket = {};

io.on("connection", (socket) => {
    console.log("New connection", socket.id);

    const userId = socket.handshake.query.userId;
    if(userId) userSocket[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userSocket));

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
        delete userSocket[userId];
        io.emit("getOnlineUsers", Object.keys(userSocket));
    });
});

export {app, server, io}
