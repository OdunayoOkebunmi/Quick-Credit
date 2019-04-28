import express from 'express';
import UserController from '../controllers/userController';

const { createUser, loginUser } = UserController;
const router = express.Router();

router.post('/signup', createUser);
router.post('/signin', loginUser);

export default router;
