import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateFeedbackDto } from './create-feedback.dto';

export class UpdateFeedbackDto extends PartialType(CreateFeedbackDto) {
  @ApiProperty()
  text?: string;
  @ApiProperty()
  rate?: number;
  
  
  @ApiProperty()
  workId: number
  @ApiProperty()
  freelancerId: number
}
