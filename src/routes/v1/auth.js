import { Router } from 'express';
import AuthValidation from '../../middlewares/authValidation';
import { createUser, loginUser } from '../../controllers/userController';

const router = Router();
const { validateSignin, validateSignup } = AuthValidation;

router.post('/signup', validateSignup, createUser);
router.post('/signin', validateSignin, loginUser);
export default router;
