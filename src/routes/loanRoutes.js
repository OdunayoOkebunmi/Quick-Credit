import { Router } from 'express';
import { verifyUser, verifyAdmin } from '../middlewares/authorize';
import { postRepayment, getRepaymentHistory } from '../controllers/repaymentController copy';
import Validation from '../middlewares/validation';
import {
  loanApply, getAllLoans, getSingleLoan, approveLoan,
} from '../controllers/loanController';

const loanRouter = Router();
const {
  validateLoan,
  validateLoanQuery,
  validateLoanApproval,
  validateRepayment,
} = Validation;


loanRouter.post('/', verifyUser, validateLoan, loanApply);

loanRouter.patch('/:id', verifyUser, verifyAdmin, validateLoanApproval, approveLoan);

loanRouter.get('/', verifyUser, verifyAdmin, validateLoanQuery, getAllLoans);
loanRouter.get('/:id', verifyUser, verifyAdmin, getSingleLoan);


loanRouter.post('/repayments/:id', verifyUser, verifyAdmin, validateRepayment, postRepayment);
loanRouter.get('/repayments/:id', verifyUser, getRepaymentHistory);

export default loanRouter;
