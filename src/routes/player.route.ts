import { NextFunction, Router } from 'express';
import Auth from '../controllers/auth.controller';
import PlayerController from '../controllers/player.controller';

const Player = new PlayerController();
const router = Router();

router.post('/join-quiz', Player.joinQuiz);
router.post('/update-quiz', Player.updateScore);

export default router;
