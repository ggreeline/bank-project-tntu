import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateOperationDto } from './dto/create-operation.dto';
import { UpdateOperationDto } from './dto/update-operation.dto';
import { OperationService } from './operation.service';

@Controller('operation')
export class OperationController {
  constructor(private readonly operationService: OperationService) {}

  @Get()
  async findAll() {
    return this.operationService.findAll();
  }

  @Get(':operationCode')
  async findByoperationCode(@Param('operationCode') operationCode: number) {
    return this.operationService.findByOperationCode(operationCode);
  }

  @Post()
  async create(@Body() createOperationDto: CreateOperationDto) {
    return this.operationService.create(createOperationDto);
  }

  @Put(':operationCode')
  async update(
    @Param('operationCode') operationCode: number,
    @Body() updateOperationDto: UpdateOperationDto,
  ) {
    return this.operationService.update(operationCode, updateOperationDto);
  }

  @Delete(':operationCode')
  async delete(@Param('operationCode') operationCode: number) {
    await this.operationService.delete(operationCode);
    return {
      message: `Operation with code ${operationCode} has been deleted`,
    };
  }
}
