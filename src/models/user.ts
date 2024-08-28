import mongoose, { Schema } from 'mongoose';
import { IUser } from '../definitions/interfaces';

export const userSchema = new Schema<IUser>(
    {
        uuid: { type: String, required: true, unique: true },
        username: { type: String, required: true, unique: true },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model<IUser>('User', userSchema);

export default User;
