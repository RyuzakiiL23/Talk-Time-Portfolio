import express from 'express';
import protectRoute from '../middleware/protectRoute.js';
import { getUsers } from '../controllers/usersControllers.js';
import { updateUser } from '../controllers/usersControllers.js';

const router = express.Router();

router.get('/', protectRoute, getUsers);
router.patch('/update', protectRoute, updateUser);

export default router;