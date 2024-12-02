import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Table } from 'src/table/schemas/table.schema';
import { TableService } from 'src/table/table.service';
import { Operation } from '../operation/interfaces/operation.interface';
import { QueueResponseDto } from './dto/queue-response.dto';
import { Queue } from './interfaces/queue.interface';

@Injectable()
export class QueueService {
  constructor(
    @InjectModel('Queue') private readonly queueModel: Model<Queue>,
    @InjectModel('Operation') private readonly operationModel: Model<Operation>,
    @InjectModel('Table') private readonly tableModel: Model<Table>,
    private readonly tableService: TableService,
  ) {}

  async create(createQueueDto: any): Promise<QueueResponseDto> {
    const { operationCode, tableNumber, customerName, phoneNumber } =
      createQueueDto;
    const operation = await this.operationModel.findOne({ operationCode });
    if (!operation) {
      throw new Error(`Operation with code ${operationCode} does not exist.`);
    }
    const table = await this.tableModel.findOne({ tableNumber: tableNumber });
    if (!table) {
      throw new Error(`Table ${tableNumber} does not exist.`);
    }
    if (!table.operationCodes.includes(operationCode)) {
      throw new Error(
        `Table ${tableNumber} does not support operation code ${operationCode}.`,
      );
    }
    const nextAvailableTime = table.nextAvailableTime;
    const queueEntry = new this.queueModel({
      customerName,
      phoneNumber,
      operation,
      tableNumber,
      assignedTime: nextAvailableTime,
    });
    return queueEntry.save();
  }

  async findAll(): Promise<QueueResponseDto[]> {
    return this.queueModel.find().populate('operation').exec();
  }

  async findByOperationCode(
    operationCode: number,
  ): Promise<QueueResponseDto[]> {
    const operation = await this.operationModel
      .findOne({ operationCode: operationCode })
      .exec();
    if (!operation) {
      throw new NotFoundException(
        `Operation with code ${operationCode} was not found!`,
      );
    }

    const queues = await this.queueModel
      .find({ operation: operation._id })
      .populate('operation')
      .exec();

    return queues.map((queue) => ({
      customerName: queue.customerName,
      phoneNumber: queue.phoneNumber,
      tableNumber: queue.tableNumber,
      operation: {
        name: queue.operation.name,
        description: queue.operation.description,
        operationCode: queue.operation.operationCode,
        timeToComplete: queue.operation.timeToComplete,
      },
      assignedTime: queue.assignedTime,
      createdAt: queue.createdAt,
    }));
  }

  async findByPhoneNumber(phoneNumber: string): Promise<QueueResponseDto[]> {
    const queues = await this.queueModel
      .find({ phoneNumber })
      .populate('operation')
      .exec();
    if (!queues) {
      throw new NotFoundException(
        `Queue entry for phone number ${phoneNumber} not found`,
      );
    }

    return queues.map((queue) => ({
      customerName: queue.customerName,
      phoneNumber: queue.phoneNumber,
      tableNumber: queue.tableNumber,
      operation: {
        name: queue.operation.name,
        description: queue.operation.description,
        operationCode: queue.operation.operationCode,
        timeToComplete: queue.operation.timeToComplete,
      },
      assignedTime: queue.assignedTime,
      createdAt: queue.createdAt,
    }));
  }

  async deleteOne(id: string): Promise<void> {
    await this.queueModel.findByIdAndDelete(id).exec();
  }
}
