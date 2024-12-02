import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Table extends Document {
  @Prop({ required: true, unique: true })
  tableNumber: number;

  @Prop([Number])
  operationCodes: number[];

  @Prop({ default: 480 })
  nextAvailableTime: number;
}

export const TableSchema = SchemaFactory.createForClass(Table);
