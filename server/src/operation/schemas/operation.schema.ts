import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Operation extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  operationCode: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  timeToComplete: number;
}

export const OperationSchema = SchemaFactory.createForClass(Operation);
