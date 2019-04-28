import express from 'express';
import UserController from '../controllers/userController';

const router = express.Router();


const { createUser, loginUser, adminVerifyUser } = UserController;

// router to create user accont
router.post('/api/v1/auth/signup', createUser);

// router to sign in user
router.post('/api/v1/auth/signin', loginUser);

// router for admin to verify user
router.patch('/api/v1/users/:email/verify', adminVerifyUser);

export default router;
