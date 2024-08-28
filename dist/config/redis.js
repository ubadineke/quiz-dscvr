"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const env_1 = __importDefault(require("../validations/env"));
const redis = new ioredis_1.default(env_1.default.EXTERNAL_REDIS);
exports.default = redis;
