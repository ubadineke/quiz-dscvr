"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const player_controller_1 = __importDefault(require("../controllers/player.controller"));
const Player = new player_controller_1.default();
const router = (0, express_1.Router)();
router.use(auth_controller_1.default.findOrCreatePlayer);
router.post('/join-quiz', Player.joinQuiz);
exports.default = router;
