import { Router } from 'express';
import Auth from '../controllers/auth.controller';

const router = Router();
router.post('/create-quiz', Auth.findOrCreateUser);

export default router;
