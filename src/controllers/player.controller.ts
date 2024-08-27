//Join game

import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../definitions/decorators';
import Redis from 'ioredis';
import User from '../models/user';

const redis = new Redis();

export default class PlayerController {
    @catchAsync
    public async joinQuiz(req: Request, res: Response, next: NextFunction) {
        const { pin } = req.query;
        const { user } = req;
        await redis.rpush(`${pin}_quiz`, JSON.stringify(user));
        // console.log('done');
        const list = await redis.lrange(`${pin}_quiz`, 0, -1);
        const users = list.map((item) => JSON.parse(item));

        res.status(200).json({ message: 'user successfully added', users });
    }

    // @catchAsync
    // public async joinGame(req: Request, res: Response, next: NextFunction){
    //     const {pin} = req.query;
    //     const {user} = req;
    //     const user = await User.create()
    // }
}
