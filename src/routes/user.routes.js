import express from 'express';
import { UserController } from '../controllers/user.controller.js';
import { auth } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/me', auth, UserController.getUserDetails);

export default router;