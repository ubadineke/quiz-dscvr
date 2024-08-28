import mongoose, { Connection } from 'mongoose';
import env from '../validations/env';

async function connectDatabase() {
    let DB: string;
    if (env.ENV === 'production') {
        DB = env.DB;
    } else DB = env.DB_LOCAL;
    const connection = await mongoose
        .connect(DB)
        .then(() => console.log('DATABASE CONNECTED'))
        .catch((error: any) => {
            console.error('MongoDB connection error:', error.message);
            process.exit(1);
        });
}

export default connectDatabase;
