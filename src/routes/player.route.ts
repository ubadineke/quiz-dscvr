import { Router } from 'express';
import Auth from '../controllers/auth.controller';
import PlayerController from '../controllers/player.controller';

const Player = new PlayerController();
const router = Router();

router.use(Auth.findOrCreatePlayer);
router.post('/join-quiz', Player.joinQuiz);

export default router;
