import { Router } from 'express';
import AuthValidation from '../middlewares/authValidation';
import { createUser, loginUser } from '../controllers/userController';

const authRouter = Router();
const { validateSignin, validateSignup } = AuthValidation;

authRouter.post('/signup', validateSignup, createUser);
authRouter.post('/signin', validateSignin, loginUser);

export default authRouter;
