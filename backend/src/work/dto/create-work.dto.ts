import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  deadline: Date;
  @ApiProperty()
  description: string;
  @ApiProperty()
  skills: number[];
}


