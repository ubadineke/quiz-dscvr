import mongoose, { Schema } from 'mongoose';
import { IQuestion, IQuiz } from '../definitions/interfaces';
import { QuestionTypes } from '../definitions/enums';

const questionSchema = new Schema<IQuestion>({
    question: { type: String, required: true },
    questionType: { type: Number, enum: Object.values(QuestionTypes), required: true },
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
        questions: { type: [questionSchema], required: true },
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
    } else {
        if (this.correctAnswer !== 'true' && this.correctAnswer !== 'false') {
            return next(new Error('True/False questions must have "true" or "false" as the correct answer.'));
        }
    }
    next();
});

const Quiz = mongoose.model<IQuiz>('Quiz', quizSchema);

export default Quiz;
