//Create a quiz
//Delete a quiz
//Update a quiz
//Show existing quizzes

import { Request, Response, NextFunction } from 'express';
import Quiz from '../models/quiz';
import { catchAsync } from '../definitions/decorators';

export default class UserController {
    @catchAsync
    async createQuiz(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        const { questions } = req.body;
        if (questions.length === 0) return res.status(400).json('Provide questions');

        const quiz = await Quiz.create({ creator: req.user, questions });
        res.status(200).json(quiz);
    }
}
