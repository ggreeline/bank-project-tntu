import { Document } from 'mongoose';

export interface Operation extends Document {
  name: string;
  operationCode: number;
  description: string;
  timeToComplete: number;
}
