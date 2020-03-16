import { Router } from 'express';
import AuthValidation from '../middlewares/authValidation';
import { createUser, loginUser } from '../controllers/userControllers';

const authRouter = Router();
const { validateSignin, validateSignup } = AuthValidation;

// router to create user accont
authRouter.post('/signup', validateSignup, createUser);

// router to sign in user
authRouter.post('/signin', validateSignin, loginUser);

export default authRouter;
