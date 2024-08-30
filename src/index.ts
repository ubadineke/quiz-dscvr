import express, { Request, Response } from 'express';
import connectDatabase from './config/db';
import env from './validations/env';
import authRouter from './routes/user.route';
import playerRouter from './routes/player.route';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { registerSocketEvents } from './config/socket';
import path from 'path';

const app = express();
const server = createServer(app);
export const io = new SocketIOServer(server);

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

registerSocketEvents(io);

app.use('/api', playerRouter);
app.use('/api', authRouter);

connectDatabase();

const PORT = env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
