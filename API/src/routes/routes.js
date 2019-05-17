import express from 'express';
import Authorization from '../middlewares/authorize';
import UserController from '../controllers/userController';
import LoanController from '../controllers/loanController';
import RepaymentController from '../controllers/repaymentController';
import Validation from '../middlewares/validation';

const { verifyUser, verifyAdmin } = Authorization;
const router = express.Router();


const { createUser, loginUser, adminVerifyUser } = UserController;
const {
  loanApply, getAllLoans, getOneLoan, approveLoan,
} = LoanController;
const { postRepayment, getRepaymentHistory } = RepaymentController;

const {
  validateSignUp,
  validateLogin,
  validateLoan,
  validateRepayment,
  validateId,
  validateVerification,
  validateLoanQuery,
  validateLoanApproval,
} = Validation;
// router to create user accont
router.post('/api/v1/auth/signup', validateSignUp, createUser);

// router to sign in user
router.post('/api/v1/auth/signin', validateLogin, loginUser);

// router for user loan application
router.post('/api/v1/loans', verifyUser, validateLoan, loanApply);


// router for admin to post repayment transaction for client
router.post('/api/v1/loans/:id/repayment', verifyAdmin, validateRepayment, validateId, postRepayment);

// router for admin to verify user
router.patch('/api/v1/users/:email/verify', verifyAdmin, validateVerification, adminVerifyUser);

// router for admin to aprove or reject loan
router.patch('/api/v1/loans/:id', verifyAdmin, validateLoanApproval, validateId, approveLoan);


// router for user to get repayment history
router.get('/api/v1/loans/:id/repayments', verifyUser, validateId, getRepaymentHistory);

// router for admin to get all loan application
router.get('/api/v1/loans', verifyAdmin, validateLoanQuery, getAllLoans);

// router for admin to get all a specifc application
router.get('/api/v1/loans/:id', verifyAdmin, validateId, getOneLoan);

export default router;
