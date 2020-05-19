import { Router } from 'express';
import { verifyUser, verifyAdmin } from '../../middlewares/authorize';
import { postRepayment, getRepaymentHistory } from '../../controllers/repaymentController';

const router = Router();

router.post('/:id', verifyUser, verifyAdmin, postRepayment);
router.get('/:id', verifyUser, getRepaymentHistory);

export default router;
