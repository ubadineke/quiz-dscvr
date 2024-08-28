import mongoose, { Schema } from 'mongoose';
import { IUser } from '../definitions/interfaces';
import { userSchema } from './user';

const Player = mongoose.model<IUser>('Player', userSchema);

export default Player;
