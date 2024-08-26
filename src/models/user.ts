import mongoose, { Schema } from 'mongoose';
import { IUser } from '../definitions/interfaces';

const userSchema = new Schema<IUser>(
    {
        uuid: { type: String, required: true },
        username: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model<IUser>('User', userSchema);

export default User;
