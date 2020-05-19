import express from 'express';
import authRoutes from './auth';
import loanRoutes from './loanRoutes';
import repaymentRoutes from './repayment';
import verifyUserRoute from './verifyUser';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/loans', loanRoutes);
router.use('/loans/repayments', repaymentRoutes);
router.use('/users', verifyUserRoute);
export default router;
