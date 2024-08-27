import { Router } from 'express';
import Auth from '../controllers/auth.controller';
import UserController from '../controllers/user.controller';

const User = new UserController();
const router = Router();

router.use(Auth.findOrCreateUser);
router.post('/quiz', User.createQuiz);
router.get('/quizzes', User.getQuizzes);
router.post('/pin', User.createPin);

export default router;
