import express from 'express';
import protectRoute from '../middleware/protectRoute.js';
import { getMessages, sendMessage } from '../controllers/messagesControllers.js';


/**
 * Express router for handling messages.
 * @type {import('express').Router}
 */
const router = express.Router();

router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

export default router;