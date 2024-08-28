"use strict";
//Join game
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
const decorators_1 = require("../definitions/decorators");
const redis_1 = __importDefault(require("../config/redis"));
const quiz_1 = __importDefault(require("../models/quiz"));
class PlayerController {
    joinQuiz(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { uuid, username, pin } = req.body;
            const user = {
                uuid,
                username,
            };
            const storedPin = yield redis_1.default.sismember('pins', pin);
            if (storedPin) {
                yield redis_1.default.rpush(`${pin}_quiz`, JSON.stringify(user));
            }
            else {
                const quiz = yield quiz_1.default.findOne({ pin });
                if (quiz) {
                    yield redis_1.default.rpush(`${pin}_quiz`, JSON.stringify(user));
                }
                else {
                    return res.status(400).json('Pin not valid');
                }
            }
            return res.status(200).json({ message: 'user successfully added', user });
        });
    }
}
exports.default = PlayerController;
__decorate([
    decorators_1.catchAsync,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], PlayerController.prototype, "joinQuiz", null);
