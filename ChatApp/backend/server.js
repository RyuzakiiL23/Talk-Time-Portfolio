import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.js';
import messageRoutes from './routes/messages.js';
import userRoutes from './routes/users.js';
import cors from 'cors';

import connectDB from './database/db.js';
import { app, server } from './socket/socket.js';

dotenv.config();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));


const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);


server.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});
