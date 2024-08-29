//Create a quiz
//Delete a quiz
//Update a quiz
//Show existing quizzes

import { Request, Response, NextFunction } from 'express';
import Quiz from '../models/quiz';
import { catchAsync } from '../definitions/decorators';
import randomSixDigitNumber from '../utils/randomNumber';
import redis from '../config/redis';
import Play from '../models/play';
import { RedisSearchLanguages } from 'redis';
import Player from '../models/player';

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
    public async createPin(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        const { id } = req.query;
        if (req.query.pin !== 'yes') return res.status(400).json('provide correct flag');
        const pin = randomSixDigitNumber();
        const quiz = await Quiz.findOne({ creator: req.user, _id: id });

        if (!quiz) return res.status(404).json("Quiz doesn't exist");

        if (quiz.pin) {
            if (quiz.pin.toString().length === 6) {
                redis.set('pin', JSON.stringify(quiz.pin));
                return res.status(400).json({ message: 'A pin is already set and cannot be updated' });
            } else {
                console.log("'Existing pin is invalid; it will be changed to a 6-digit number");
                quiz.pin = pin;
            }
        }

        quiz.pin = pin;
        await quiz.save({ validateBeforeSave: false });
        await redis.sadd('pins', quiz.pin.valueOf());
        return res.status(200).json({ pin: quiz.pin });
    }

    @catchAsync
    public async startQuiz(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        const { id } = req.query;
        if (req.query.start != 'yes') return res.status(400).json('Provide correct flag');
        const quiz = await Quiz.findOneAndUpdate({ _id: id }, { active: true }, { new: true });
        if (!quiz) return res.status(404).json('Quiz not found');
        const { pin } = quiz;

        const list = await redis.lrange(`${quiz.pin}_quiz`, 0, -1);
        const players = list.map((item) => JSON.parse(item));
        // await Player.insertMany(players, { ordered: false }).finally;
        await redis.del(`${pin}_quiz`);
        res.status(200).json({ message: 'Game started', count: players.length, players });
    }

    @catchAsync
    public async endQuiz(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        const { pin, uuid } = req.body;
        if (!uuid || !pin) {
            return res.status(400).json('Provide complete information');
        }
        const quiz = await Quiz.findOne({ pin, creator: req.user });
        if (!quiz) return res.status(400).json('Quiz does not exist');
        const playersScores = await redis.hgetall(`${pin}_scores`);
        console.log(playersScores);
        const players = Object.entries(playersScores).map(([playerId, score]) => ({
            player: playerId,
            quiz: quiz, // Assuming quiz is passed in the request body
            score: parseInt(score),
        }));
        console.log(players);
        await Play.insertMany(players, { ordered: false });
        //    await Play.create({
        //     player: ,
        //     quiz,
        //     score
        //    })
        res.status(201).json(players);
    }
}
