"use strict";
//Create a quiz
//Delete a quiz
//Update a quiz
//Show existing quizzes
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const quiz_1 = __importDefault(require("../models/quiz"));
const decorators_1 = require("../definitions/decorators");
const randomNumber_1 = __importDefault(require("../utils/randomNumber"));
const redis_1 = __importDefault(require("../config/redis"));
const player_1 = __importDefault(require("../models/player"));
class UserController {
    createQuiz(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { questions } = req.body;
            if (questions.length === 0)
                return res.status(400).json('Provide questions');
            const quiz = yield quiz_1.default.create({ creator: req.user, questions });
            res.status(201).json(quiz);
        });
    }
    getQuizzes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const quizzes = yield quiz_1.default.find({ creator: req.user });
            if (!quizzes)
                return res.status(404).json('No created quizzes for this user');
            res.status(200).json({ count: quizzes.length, quizzes });
        });
    }
    createPin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.query;
            if (req.query.pin !== 'yes')
                return res.status(400).json('provide correct flag');
            const pin = (0, randomNumber_1.default)();
            const quiz = yield quiz_1.default.findOne({ creator: req.user, _id: id });
            if (!quiz)
                return res.status(404).json("Quiz doesn't exist");
            if (quiz.pin) {
                if (quiz.pin.toString().length === 6) {
                    redis_1.default.set('pin', JSON.stringify(quiz.pin));
                    return res.status(400).json({ message: 'A pin is already set and cannot be updated' });
                }
                else {
                    console.log("'Existing pin is invalid; it will be changed to a 6-digit number");
                    quiz.pin = pin;
                }
            }
            quiz.pin = pin;
            yield quiz.save({ validateBeforeSave: false });
            yield redis_1.default.sadd('pins', quiz.pin.valueOf());
            return res.status(200).json({ pin: quiz.pin });
        });
    }
    startQuiz(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.query;
            if (req.query.start != 'yes')
                return res.status(400).json('Provide correct flag');
            const quiz = yield quiz_1.default.findOneAndUpdate({ _id: id }, { active: true }, { new: true });
            if (!quiz)
                return res.status(404).json('Quiz not found');
            const { pin } = quiz;
            const list = yield redis_1.default.lrange(`${quiz.pin}_quiz`, 0, -1);
            const players = list.map((item) => JSON.parse(item));
            yield player_1.default.insertMany(players, { ordered: false });
            yield redis_1.default.del(`${pin}_quiz`);
            res.status(200).json({ message: 'Game started', count: players.length, players });
        });
    }
}
exports.default = UserController;
__decorate([
    decorators_1.catchAsync,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createQuiz", null);
__decorate([
    decorators_1.catchAsync,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getQuizzes", null);
__decorate([
    decorators_1.catchAsync,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createPin", null);
__decorate([
    decorators_1.catchAsync,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "startQuiz", null);
