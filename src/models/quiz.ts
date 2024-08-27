import mongoose, { Schema } from 'mongoose';
import { IQuestion, IQuiz } from '../definitions/interfaces';
import { QuestionTypes } from '../definitions/enums';
import User from './user';

const questionSchema = new Schema<IQuestion>({
    question: { type: String, required: true },
    questionType: { type: Number, enum: [1, 2], required: true },
    options: {
        A: { type: String },
        B: { type: String },
        C: { type: String },
        D: { type: String },
    },
    correctAnswer: { type: String, required: true },
});

const quizSchema = new Schema<IQuiz>(
    {
        creator: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
        questions: { type: [questionSchema], required: true },
        pin: { type: Number },
        active: { type: Boolean, default: false, required: true },
    },
    {
        timestamps: true,
    }
);

questionSchema.pre<IQuestion>('validate', function (next) {
    if (this.questionType === QuestionTypes.MultipleChoice) {
        if (!(this.options?.A && this.options?.B && this.options?.C && this.options?.D)) {
            return next(new Error('Multiple choice questions must have options A, B, C, and D.'));
        }
    } else if (this.questionType === QuestionTypes.TrueFalse) {
        if (this.correctAnswer !== 'true' && this.correctAnswer !== 'false') {
            return next(new Error('True/False questions must have "true" or "false" as the correct answer.'));
        }
    } else {
        return next(new Error('Invalid question type.'));
    }
    next();
});

const Quiz = mongoose.model<IQuiz>('Quiz', quizSchema);

export default Quiz;
