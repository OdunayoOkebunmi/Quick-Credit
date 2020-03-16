import { Router } from 'express';
import { verifyUser, verifyAdmin } from '../middlewares/authorize';
import { adminVerifyUser } from '../controllers/userControllers';
import Validation from '../middlewares/validation';

const { validateVerification } = Validation;

const verifyUserRouter = Router();

// router for admin to verify user
verifyUserRouter.patch('/:email/verify', verifyUser, verifyAdmin, validateVerification, adminVerifyUser);

export default verifyUserRouter;
