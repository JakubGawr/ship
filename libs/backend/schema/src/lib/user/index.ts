import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { UserLoginDTO } from '@ship-game/backend/validation';

export const USER_SCHEMA = new mongoose.Schema({
  name: { type: String, required: true }
});

export interface USER extends Document, UserLoginDTO{};

export const USER_TOKEN = 'user';
