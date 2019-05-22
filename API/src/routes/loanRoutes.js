import { Router } from 'express';
import Authorization from '../middlewares/authorize';
import LoanController from '../controllers/loanController';
import RepaymentController from '../controllers/repaymentController';
import Validation from '../middlewares/validation';

const loanRouter = Router();
const { verifyUser, verifyAdmin } = Authorization;
const {
  loanApply, getAllLoans, getOneLoan, approveLoan,
} = LoanController;
const { postRepayment, getRepaymentHistory } = RepaymentController;
const {
  validateLoan,
  validateId,
  validateLoanQuery,
  validateLoanApproval,
  validateRepayment,
} = Validation;


//  router for user loan application
loanRouter.post('/', verifyUser, validateLoan, loanApply);
// router for admin to aprove or reject loan
loanRouter.patch('/:id', verifyAdmin, validateLoanApproval, validateId, approveLoan);
// router for admin to get all loan application
loanRouter.get('/', verifyAdmin, validateLoanQuery, getAllLoans);
// router for admin to get all a specific application
loanRouter.get('/:id', verifyAdmin, validateId, getOneLoan);


// REPAYMENTS ROUTES

// router for admin to post repayment transaction for client
loanRouter.post('/:id/repayment', verifyAdmin, validateRepayment, validateId, postRepayment);
// router for user to get repayment history
loanRouter.get('/:id/repayments', verifyUser, validateId, getRepaymentHistory);

export default loanRouter;
