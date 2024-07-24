import { ApiProperty } from "@nestjs/swagger";

export class CreateSkillWorkDto {
    @ApiProperty()
    skillId:number
    @ApiProperty()
    workId:number
}
