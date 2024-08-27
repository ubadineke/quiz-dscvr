import { Router } from 'express';
import Auth from '../controllers/auth.controller';
import UserController from '../controllers/user.controller';

const User = new UserController();
const router = Router();

router.use(Auth.findOrCreateUser);
router.post('/create-quiz', User.createQuiz);

export default router;
