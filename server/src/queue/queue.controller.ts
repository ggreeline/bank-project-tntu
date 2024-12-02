import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateQueueDto } from './dto/create-queue.dto';
import { QueueResponseDto } from './dto/queue-response.dto';
import { QueueService } from './queue.service';

@Controller('queue')
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Post()
  async createQueue(@Body() createQueueDto: CreateQueueDto) {
    return await this.queueService.create(createQueueDto);
  }

  @Get()
  async getAll(): Promise<QueueResponseDto[]> {
    return this.queueService.findAll();
  }

  @Get('/operation/:operationCode')
  async findByOperationCode(
    @Param('operationCode') operationCode: number,
  ): Promise<QueueResponseDto[]> {
    return this.queueService.findByOperationCode(operationCode);
  }

  @Get(':phoneNumber')
  async getQueueByPhoneNumber(
    @Param('phoneNumber') phoneNumber: string,
  ): Promise<QueueResponseDto[]> {
    return this.queueService.findByPhoneNumber(phoneNumber);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<{ message: string }> {
    await this.queueService.deleteOne(id);
    return {
      message: `Queue entry for id ${id} has been deleted`,
    };
  }
}
