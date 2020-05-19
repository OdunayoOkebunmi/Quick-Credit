import { Router } from 'express';
import { verifyUser, verifyAdmin } from '../../middlewares/authorize';
import LoanValidation from '../../middlewares/loanValidation';
import {
  loanApply, getAllLoans, getSingleLoan, approveLoan,
} from '../../controllers/loanController';

const router = Router();
const { createLoan, loanApproval } = LoanValidation;


router.post('/', verifyUser, createLoan, loanApply);

router.patch('/:id', verifyUser, verifyAdmin, loanApproval, approveLoan);

router.get('/', verifyUser, verifyAdmin, getAllLoans);
router.get('/:id', verifyUser, verifyAdmin, getSingleLoan);


export default router;
