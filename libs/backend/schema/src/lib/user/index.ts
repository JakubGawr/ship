import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export const USER_SCHEMA = new mongoose.Schema({
  name: { type: String, required: true }
});

export interface USER extends Document {
  name: string
}

export const USER_TOKEN = 'user';
