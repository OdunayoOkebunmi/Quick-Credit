import express from 'express';
import Authorization from '../middlewares/authorize';
import UserController from '../controllers/userController';
import LoanController from '../controllers/loanController';
import RepaymentController from '../controllers/repaymentController';

const { verifyUser, verifyAdmin } = Authorization;
const router = express.Router();


const { createUser, loginUser, adminVerifyUser } = UserController;
const {
  loanApply, getAllLoans, getSpecificLoan, loanApproval,
} = LoanController;
const { postRepayment, getRepaymentHistory } = RepaymentController;


// router to create user accont
router.post('/api/v1/auth/signup', createUser);

// router to sign in user
router.post('/api/v1/auth/signin', loginUser);

// router for user loan application
router.post('/api/v1/loans', verifyUser, loanApply);


// router for admin to post repayment transaction for client
router.post('/api/v1/loans/:id/repayment', verifyAdmin, postRepayment);

// router for admin to verify user
router.patch('/api/v1/users/:email/verify', verifyAdmin, adminVerifyUser);

// router for admin to aprove or reject loan
router.patch('/api/v1/loans/:id', verifyAdmin, loanApproval);


// router for user to get repayment hsitory
router.get('/api/v1/loans/:id/repayments', verifyUser, getRepaymentHistory);

// router for admin to get all loan application
router.get('/api/v1/loans', verifyAdmin, getAllLoans);

// router for admin to get all loan application that has been approved but not repaid
router.get('/api/v1/loans?status=approved&repaid=false', verifyAdmin, getAllLoans);

// router for admin to get all loan application that has been approved and repaid
router.get('/api/v1/loans?status=approved&repaid=true', verifyAdmin, getAllLoans);

// router for admin to get all a specifc application
router.get('/api/v1/loans/:id', verifyAdmin, getSpecificLoan);




export default router;
