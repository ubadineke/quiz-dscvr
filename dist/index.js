"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const env_1 = __importDefault(require("./validations/env"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const player_route_1 = __importDefault(require("./routes/player.route"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api', player_route_1.default);
app.use('/api', user_route_1.default);
(0, db_1.default)();
const PORT = env_1.default.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
