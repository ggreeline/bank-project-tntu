import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOperationDto } from './dto/create-operation.dto';
import { UpdateOperationDto } from './dto/update-operation.dto';
import { Operation } from './interfaces/operation.interface';

@Injectable()
export class OperationService {
  constructor(
    @InjectModel('Operation') private readonly operationModel: Model<Operation>,
  ) {}

  async findAll(): Promise<Operation[]> {
    const operations = await this.operationModel.find();
    return operations;
  }

  async findByOperationCode(operationCode: number): Promise<Operation> {
    const operation = await this.operationModel
      .findOne({ operationCode })
      .exec();
    if (!operation) {
      throw new NotFoundException(
        `Operation with code ${operationCode} was not found!`,
      );
    }
    return operation;
  }

  async create(createOperationDto: CreateOperationDto): Promise<Operation> {
    const newOperation = new this.operationModel(createOperationDto);
    return newOperation.save();
  }

  async update(
    operationCode: number,
    updateOperationDto: UpdateOperationDto,
  ): Promise<Operation> {
    const updatedOperation = await this.operationModel
      .findOneAndUpdate({ operationCode }, updateOperationDto, { new: true })
      .exec();
    if (!updatedOperation) {
      throw new NotFoundException(
        `Operation with code ${operationCode} was not found!`,
      );
    }
    return updatedOperation;
  }

  async delete(operationCode: number): Promise<void> {
    const result = await this.operationModel
      .deleteOne({ operationCode })
      .exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(
        `Operation with code ${operationCode} was not found!`,
      );
    }
  }
}
