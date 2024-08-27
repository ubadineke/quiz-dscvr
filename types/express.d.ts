import { Express } from 'express';
import { IUser } from '../src/definitions/interfaces';
import User from '../src/models/user';

declare global {
    namespace Express {
        export interface Request {
            user: IUser;
        }
    }
}
