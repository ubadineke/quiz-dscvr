"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const env_1 = __importDefault(require("../validations/env"));
let redis;
if (env_1.default.ENV === 'production') {
    redis = new ioredis_1.default(env_1.default.EXTERNAL_REDIS);
}
else {
    redis = new ioredis_1.default();
}
// const redis = new Redis();
exports.default = redis;
