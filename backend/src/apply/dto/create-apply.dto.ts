import { ApiProperty } from '@nestjs/swagger';

export class CreateApplyDto {
  @ApiProperty()
  freelancerId: number;
  @ApiProperty()
  workId: number;
}
