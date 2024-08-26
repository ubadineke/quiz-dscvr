import { catchAsync } from '../definitions/decorators';
import { Request, Response, NextFunction } from 'express';
import User from '../models/user';

export default class Auth {
    @catchAsync
    static async findOrCreateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { uuid, username } = req.body;
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
        res.status(200).json(user);
        // next();
    }

    // createQuiz: Base = async (req, res, next) => {};
}
