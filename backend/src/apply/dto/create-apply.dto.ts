import { ApiProperty } from '@nestjs/swagger';

export class CreateApplyDto {

  @ApiProperty()
  workId: number;
}
