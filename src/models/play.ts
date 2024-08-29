//player
//quiz
//

import mongoose, { Schema } from 'mongoose';
import { IPlay } from '../definitions/interfaces';
import Player from './player';
import Quiz from './quiz';

const playSchema = new Schema<IPlay>({
    player: { type: String, required: true, unique: true },
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: Quiz, required: true },
    score: { type: Number, default: 0 },
    position: { type: Number },
});

const Play = mongoose.model<IPlay>('Play', playSchema);

export default Play;
