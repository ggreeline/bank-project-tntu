import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Queue } from 'src/queue/interfaces/queue.interface';
import { Table } from './schemas/table.schema';

@Injectable()
export class TableService {
  constructor(
    @InjectModel('Table') private readonly tableModel: Model<Table>,
    @InjectModel('Queue') private readonly queueModel: Model<Queue>,
  ) {}

  private readonly BANK_OPENING_TIME = 480;
  private readonly BANK_CLOSING_TIME = 1140;

  async createTable(tableNumber: number, operationCodes: number[]) {
    if (isNaN(tableNumber)) {
      throw new Error('Invalid tableNumber');
    }
    const table = new this.tableModel({ tableNumber, operationCodes });
    return table.save();
  }

  async getTables() {
    return this.tableModel.find().exec();
  }

  async findTableByNumber(tableNumber: number) {
    if (isNaN(tableNumber)) {
      throw new Error('Invalid tableNumber');
    }
    return this.tableModel.findOne({ tableNumber }).exec();
  }

  private getCurrentTimeInMinutes(): number {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  }

  // Helper function to get next day opening time (8:00 AM next day)
  private getNextDayOpeningTime(): number {
    return this.BANK_OPENING_TIME + 1440; // Next day opening time (480 minutes + 24 hours)
  }

  private async updateAvailableTime(table: Table): Promise<number> {
    const tableQueues = await this.queueModel
      .find({ tableNumber: table.tableNumber })
      .populate('operation')
      .exec();

    let nextAvailableTime: number;

    // Determine the current time in minutes from midnight
    const currentTime = this.getCurrentTimeInMinutes();

    // If no queues exist, set the available time to opening time or current time
    if (tableQueues.length === 0) {
      if (currentTime < this.BANK_OPENING_TIME) {
        nextAvailableTime = this.BANK_OPENING_TIME; // Set to bank opening time
      } else if (currentTime > this.BANK_CLOSING_TIME) {
        nextAvailableTime = this.getNextDayOpeningTime(); // Set to next day's opening time
      } else {
        nextAvailableTime = currentTime; // Use current time
      }
    } else {
      // Sort queues by assignedTime to process them sequentially
      tableQueues.sort((a, b) => a.assignedTime - b.assignedTime);

      let queueEndTime = this.BANK_OPENING_TIME; // Start from opening time

      for (const queueItem of tableQueues) {
        const assignedTime = queueItem.assignedTime;
        const operationTime = queueItem.operation.timeToComplete;

        // Calculate end time for this queue item
        const itemEndTime =
          Math.max(queueEndTime, assignedTime) + operationTime;

        // Check if the queue extends beyond the closing time
        if (itemEndTime > this.BANK_CLOSING_TIME) {
          nextAvailableTime = this.getNextDayOpeningTime(); // Move to next day's opening time
          break;
        } else {
          queueEndTime = itemEndTime; // Update queue end time
        }
      }

      // If all queues fit within the current day, use the final queue end time
      nextAvailableTime = nextAvailableTime || queueEndTime;
    }

    // Ensure that available time is within valid bounds (not exceeding 24 hours)
    if (nextAvailableTime >= 1440) {
      nextAvailableTime = this.BANK_OPENING_TIME; // Reset to bank opening time if over 24 hours
    }

    // Update the table's next available time in the database
    await this.tableModel.findOneAndUpdate(
      { tableNumber: table.tableNumber },
      { nextAvailableTime },
      { new: true },
    );

    return nextAvailableTime;
  }

  async getTablesByOperationCode(operationCode: number): Promise<Table[]> {
    const tables = await this.tableModel
      .find({ operationCodes: operationCode })
      .exec();

    // Update all tables' nextAvailableTime before returning
    await Promise.all(tables.map((table) => this.updateAvailableTime(table)));

    // Re-fetch tables to ensure updated values are returned
    return this.tableModel.find({ operationCodes: operationCode }).exec();
  }

  // Reset all available times for tables
  async resetAllAvailableTimes(): Promise<void> {
    const tables = await this.tableModel.find().exec();

    for (const table of tables) {
      if (isNaN(table.nextAvailableTime)) {
        await this.updateAvailableTime(table);
      }
    }
  }
}
