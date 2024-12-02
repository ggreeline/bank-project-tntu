import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AvailableTableDto } from './dto/available-table.dto';
import { TableService } from './table.service';

@Controller('tables')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Post()
  async createTable(
    @Body() dto: { tableNumber: number; operationCodes: number[] },
  ) {
    return this.tableService.createTable(dto.tableNumber, dto.operationCodes);
  }

  @Get('/available/:operationCode')
  async getAvailableTables(
    @Param('operationCode') operationCode: number,
  ): Promise<AvailableTableDto[]> {
    return this.tableService.getTablesByOperationCode(operationCode);
  }

  @Get()
  async getTables() {
    return this.tableService.getTables();
  }

  @Get(':tableNumber')
  async getByTableNumber(@Param('tableNumber') tableNumber: number) {
    return this.tableService.findTableByNumber(tableNumber);
  }

  @Get('/reset')
  async resetAvailableTime() {
    await this.tableService.resetAllAvailableTimes();
  }
}
