import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateApplyDto } from './create-apply.dto';
import { ActiveEnum, StatusEnum } from '../entities/enum';

export class UpdateApplyDto extends PartialType(CreateApplyDto) {

    @ApiProperty()
    status:StatusEnum
    @ApiProperty()
    active:ActiveEnum
}
