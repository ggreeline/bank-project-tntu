import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TableModule } from 'src/table/table.module';
import { OperationModule } from '../operation/operation.module';
import { QueueController } from './queue.controller';
import { QueueService } from './queue.service';
import { QueueSchema } from './schemas/queue.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Queue', schema: QueueSchema }]),
    OperationModule,
    forwardRef(() => TableModule),
  ],
  controllers: [QueueController],
  providers: [QueueService],
  exports: [MongooseModule, QueueService],
})
export class QueueModule {}
