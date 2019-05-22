import { Router } from 'express';
import authRouter from './auth';
import usersRouter from './verifyUser';
import loansRouter from './loanRoutes';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/loans', loansRouter);

export default router;
