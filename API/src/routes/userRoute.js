import express from 'express';
import UserController from '../controllers/userController';

const { createUser } = UserController;
const router = express.Router();

router.post('/auth/signup', createUser);


export default router;
