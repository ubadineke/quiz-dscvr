import { catchAsync } from '../definitions/decorators';
import { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import Player from '../models/player';

export default class Auth {
    @catchAsync
    static async findOrCreateUser(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        console.log(1);
        const { uuid, username } = req.body;
        if (!uuid || !username) return res.status(400).json('Provide uuid and username');
        const user = await User.findOneAndUpdate(
            { uuid },
            { uuid, username },
            {
                upsert: true, // Create the document if it doesn't exist
                new: true, // Return the newly created document
                setDefaultsOnInsert: true, // Apply default values if a new document is created
            }
        );
        req.user = user;
        next();
    }

    static async findOrCreatePlayer(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        const { uuid, username } = req.body;
        if (!uuid || !username) return res.status(400).json('Provide uuid and username');
        const user = await Player.findOneAndUpdate(
            { uuid },
            { uuid, username },
            {
                upsert: true, // Create the document if it doesn't exist
                new: true, // Return the newly created document
                setDefaultsOnInsert: true, // Apply default values if a new document is created
            }
        );
        req.user = user;
        next();
    }

    // createQuiz: Base = async (req, res, next) => {};
}
