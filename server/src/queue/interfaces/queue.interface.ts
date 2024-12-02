import { Operation } from 'src/operation/interfaces/operation.interface';

export interface Queue {
  customerName: string;
  phoneNumber: string;
  operation: Operation;
  tableNumber: number;
  assignedTime: number;
  createdAt: Date;
}
