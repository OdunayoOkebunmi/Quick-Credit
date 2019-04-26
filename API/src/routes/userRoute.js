import express from 'express';
import UserController from '../controllers/userController';

const { createUser } = UserController;
const router = express.Router();

router.post('/signup', createUser);


export default router;
