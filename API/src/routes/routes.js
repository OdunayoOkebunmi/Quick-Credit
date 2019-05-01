import express from 'express';
import UserController from '../controllers/userController';
import LoanController from '../controllers/loanController';
import Authorization from '../middlewares/authorize';

const { verifyUser, verifyAdmin } = Authorization;
const router = express.Router();


const { createUser, loginUser, adminVerifyUser } = UserController;
const {
  loanApply, getAllLoans, getSpecificLoan, loanApproval,
} = LoanController;
// router to create user accont
router.post('/api/v1/auth/signup', createUser);

// router to sign in user
router.post('/api/v1/auth/signin', loginUser);

// router for admin to verify user
router.patch('/api/v1/users/:email/verify', verifyAdmin, adminVerifyUser);

// router for user loan application
router.post('/api/v1/loans', verifyUser, loanApply);

// router for admin to get all loan application
router.get('/api/v1/loans', verifyAdmin, getAllLoans);

// router for admin to get all a specifc application
router.get('/api/v1/loans/:id', verifyAdmin, getSpecificLoan);

// router for admin to aprove or reject loan
router.patch('/api/v1/loans/:id', verifyAdmin, loanApproval);

export default router;
