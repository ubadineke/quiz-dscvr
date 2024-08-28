//Join game

import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../definitions/decorators';
import User from '../models/user';
import env from '../validations/env';
import redis from '../config/redis';
import Quiz from '../models/quiz';

export default class PlayerController {
    @catchAsync
    public async joinQuiz(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        const { uuid, username, pin } = req.body;
        const user = {
            uuid,
            username,
        };
        const storedPin = await redis.sismember('pins', pin);
        if (storedPin) {
            await redis.rpush(`${pin}_quiz`, JSON.stringify(user));
        } else {
            const quiz = await Quiz.findOne({ pin });
            if (quiz) {
                await redis.rpush(`${pin}_quiz`, JSON.stringify(user));
            } else {
                return res.status(400).json('Pin not valid');
            }
        }

        return res.status(200).json({ message: 'user successfully added', user });
    }

    // @catchAsync
    // public async joinGame(req: Request, res: Response, next: NextFunction){
    //     const {pin} = req.query;
    //     const {user} = req;
    //     const user = await User.create()
    // }
}
