import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QueueModule } from 'src/queue/queue.module';
import { TableSchema } from './schemas/table.schema';
import { TableController } from './table.controller';
import { TableService } from './table.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Table', schema: TableSchema }]),
    forwardRef(() => QueueModule),
  ],
  providers: [TableService],
  controllers: [TableController],
  exports: [TableService, MongooseModule],
})
export class TableModule {}
