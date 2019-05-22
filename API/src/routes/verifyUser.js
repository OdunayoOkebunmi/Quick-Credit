import { Router } from 'express';
import Authorization from '../middlewares/authorize';
import UserController from '../controllers/userController';
import Validation from '../middlewares/validation';

const { verifyAdmin } = Authorization;
const { adminVerifyUser } = UserController;
const { validateVerification } = Validation;

const verifyUserRouter = Router();

// router for admin to verify user
verifyUserRouter.patch('/:email/verify', verifyAdmin, validateVerification, adminVerifyUser);

export default verifyUserRouter;
