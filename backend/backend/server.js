import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';
import fs from 'fs';

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

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/'); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + '-' + file.originalname); // Unique filename
  }
});

const upload = multer({ storage: storage });

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// API endpoint for file uploads
app.post('/api/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send('No file uploaded.');
  }
  res.json({ message: 'File uploaded successfully!', filename: file.filename });
});

server.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});
