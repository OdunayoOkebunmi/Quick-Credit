import express from 'express';
import indexRouter from './v1';


const router = express.Router();

router.use('/api/v1', indexRouter);
router.get('/', (req, res) => res.status(200).send({ message: 'Welcome to QUICK CREDIT' }));
export default router;
