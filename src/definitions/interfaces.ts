import { QuestionTypes } from './enums';
import { ObjectId } from './types';
import { Request, Response, NextFunction } from 'express';
import { UUID } from './types';

//Interface defining the types for parameters to shorten typing
export interface Base {
    (req: Request, res: Response, next: NextFunction): {};
}

export interface IQuestion extends Document {
    question: string;
    questionType: QuestionTypes;
    options?: {
        A?: string;
        B?: string;
        C?: string;
        D?: string;
    };
    correctAnswer: string;
}

export interface IQuiz extends Document {
    owner: ObjectId;
    questions: IQuestion[];
}

export interface IUser extends Document {
    uuid: UUID;
    username: string;
}
