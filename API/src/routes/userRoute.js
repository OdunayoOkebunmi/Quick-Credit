import express from 'express';
import UserController from '../controllers/userController';
import Authorization from '../middlewares/authorize';

const { createUser, loginUser } = UserController;
const { verifyUser } = Authorization;
const router = express.Router();

router.post('/signup', createUser);
router.post('/signin', verifyUser, loginUser);

export default router;
