"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const User = new user_controller_1.default();
const router = (0, express_1.Router)();
router.use(auth_controller_1.default.findOrCreateUser);
router.post('/quiz', User.createQuiz);
router.get('/quizzes', User.getQuizzes);
router.patch('/quiz', User.createPin);
router.get('/quiz', User.startQuiz);
exports.default = router;
