import { Express } from 'express';
import { IUser } from '../definitions/interfaces';
import User from '../models/user';

declare global {
    namespace Express {
        export interface Request {
            user: IUser; // Change `User` to your specific user type
        }
    }
}
