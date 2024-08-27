//Create a quiz
//Delete a quiz
//Update a quiz
//Show existing quizzes

import { Request, Response, NextFunction } from 'express';
import Quiz from '../models/quiz';
import { catchAsync } from '../definitions/decorators';
import randomSixDigitNumber from '../utils/randomNumber';

export default class UserController {
    @catchAsync
    public async createQuiz(req: Request, res: Response): Promise<Response | undefined> {
        const { questions } = req.body;
        if (questions.length === 0) return res.status(400).json('Provide questions');

        const quiz = await Quiz.create({ creator: req.user, questions });
        res.status(201).json(quiz);
    }

    @catchAsync
    public async getQuizzes(req: Request, res: Response): Promise<Response | undefined> {
        const quizzes = await Quiz.find({ creator: req.user });
        if (!quizzes) return res.status(404).json('No created quizzes for this user');
        res.status(200).json({ count: quizzes.length, quizzes });
    }

    @catchAsync
    async createPin(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        const { id } = req.query;
        const pin = randomSixDigitNumber();
        const quiz = await Quiz.findOne({ creator: req.user, _id: id });

        if (!quiz) return res.status(404).json("Quiz doesn't exist");

        if (quiz.pin) {
            if (quiz.pin.toString().length === 6) {
                return res.status(400).json({ message: 'A pin is already set and cannot be updated' });
            } else {
                console.log("'Existing pin is invalid; it will be changed to a 6-digit number");
                quiz.pin = pin;
            }
        }

        quiz.pin = pin;
        await quiz.save({ validateBeforeSave: false });

        return res.status(200).json({ pin: quiz.pin });
    }
}
