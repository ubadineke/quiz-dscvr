import express, { Request, Response } from 'express';
import connectDatabase from './config/db';
import env from './validations/env';
import authRouter from './routes/user.route';

const app = express();

app.use(express.json());

app.use('/api', authRouter);
const PORT = env.PORT || 3000;

connectDatabase();

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
