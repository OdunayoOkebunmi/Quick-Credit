import { Router } from 'express';
import UserController from '../controllers/userController';
import Validation from '../middlewares/validation';

const authRouter = Router();
const { createUser, loginUser } = UserController;
const { validateSignUp, validateLogin } = Validation;

// router to create user accont
authRouter.post('/signup', validateSignUp, createUser);

// router to sign in user
authRouter.post('/signin', validateLogin, loginUser);

export default authRouter;
