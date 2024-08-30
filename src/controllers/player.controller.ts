//Join game

import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../definitions/decorators';
import redis from '../config/redis';
import Quiz from '../models/quiz';
import { io } from '..';

export default class PlayerController {
    // private io: Server;

    // constructor(io: Server) {
    //     this.io = io;
    // }

    @catchAsync
    public async joinQuiz(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        const { uuid, username, pin } = req.body;
        console.log(2);
        if (!uuid || !username || !pin) {
            return res.status(400).json('Provide complete information');
        }
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
        return res.status(200).json({ message: 'User successfully added', user });
    }

    @catchAsync
    public async updateScore(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        const { uuid, score, pin } = req.body;
        if (!uuid || !score || !pin) {
            return res.status(400).json('Provide complete information');
        }

        let playerId: string = uuid;
        await redis.hset(`${pin}_scores`, playerId, score);
        return res.status(200).json('Done');
    }
}
