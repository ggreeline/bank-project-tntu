import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Operation } from 'src/operation/schemas/operation.schema';

@Schema()
export class Queue extends Document {
  @Prop({ required: true })
  customerName: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ type: Types.ObjectId, ref: 'Operation', required: true })
  operation: Operation;

  @Prop({ required: true })
  tableNumber: number;

  @Prop()
  assignedTime: number;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const QueueSchema = SchemaFactory.createForClass(Queue);
