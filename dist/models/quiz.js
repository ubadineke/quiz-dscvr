"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const enums_1 = require("../definitions/enums");
const user_1 = __importDefault(require("./user"));
const questionSchema = new mongoose_1.Schema({
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
const quizSchema = new mongoose_1.Schema({
    creator: { type: mongoose_1.default.Schema.Types.ObjectId, ref: user_1.default, required: true },
    questions: { type: [questionSchema], required: true },
    pin: { type: Number },
    active: { type: Boolean, default: false, required: true },
}, {
    timestamps: true,
});
questionSchema.pre('validate', function (next) {
    var _a, _b, _c, _d;
    if (this.questionType === enums_1.QuestionTypes.MultipleChoice) {
        if (!(((_a = this.options) === null || _a === void 0 ? void 0 : _a.A) && ((_b = this.options) === null || _b === void 0 ? void 0 : _b.B) && ((_c = this.options) === null || _c === void 0 ? void 0 : _c.C) && ((_d = this.options) === null || _d === void 0 ? void 0 : _d.D))) {
            return next(new Error('Multiple choice questions must have options A, B, C, and D.'));
        }
    }
    else if (this.questionType === enums_1.QuestionTypes.TrueFalse) {
        if (this.correctAnswer !== 'true' && this.correctAnswer !== 'false') {
            return next(new Error('True/False questions must have "true" or "false" as the correct answer.'));
        }
    }
    else {
        return next(new Error('Invalid question type.'));
    }
    next();
});
const Quiz = mongoose_1.default.model('Quiz', quizSchema);
exports.default = Quiz;
