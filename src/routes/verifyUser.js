import { Router } from 'express';
import { verifyUser, verifyAdmin } from '../middlewares/authorize';
import { adminVerifyUser } from '../controllers/userController';
import AuthValidation from '../middlewares/authValidation';

const { validateUserVerification } = AuthValidation;

const verifyUserRouter = Router();

verifyUserRouter.patch('/:email/verify', verifyUser, verifyAdmin, validateUserVerification, adminVerifyUser);

export default verifyUserRouter;
