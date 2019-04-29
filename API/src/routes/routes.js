import express from 'express';
import UserController from '../controllers/userController';
import LoanController from '../controllers/loanController';
import Authorization from '../middlewares/authorize';

const { verifyUser } = Authorization;
const router = express.Router();


const { createUser, loginUser, adminVerifyUser } = UserController;
const { loanApply } = LoanController;
// router to create user accont
router.post('/api/v1/auth/signup', createUser);

// router to sign in user
router.post('/api/v1/auth/signin', verifyUser, loginUser);

// router for admin to verify user
router.patch('/api/v1/users/:email/verify', adminVerifyUser);

// router for user loan application
router.post('/api/v1/loans', verifyUser, loanApply);
export default router;
