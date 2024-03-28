import express from 'express';
import protectRoute from '../middleware/protectRoute.js';
import { getUsers } from '../controllers/usersControllers.js';
import { updateUser } from '../controllers/usersControllers.js';

const router = express.Router();

/**
 * Route: GET /
 * Description: Get all users
 * Middleware: protectRoute - Protects the route by requiring authentication
 * Controller: getUsers - Handles the logic for getting all users
 */
router.get('/', protectRoute, getUsers);

/**
 * Route: PATCH /update
 * Description: Update user information
 * Middleware: protectRoute - Protects the route by requiring authentication
 * Controller: updateUser - Handles the logic for updating user information
 */
router.patch('/update', protectRoute, updateUser);

export default router;