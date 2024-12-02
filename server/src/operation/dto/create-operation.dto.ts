import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateOperationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @Min(1)
  timeToComplete: number;

  @IsNumber()
  @Min(1)
  operationCode: number;
}
