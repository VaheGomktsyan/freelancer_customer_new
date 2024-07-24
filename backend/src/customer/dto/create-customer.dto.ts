import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  description: string;
}
