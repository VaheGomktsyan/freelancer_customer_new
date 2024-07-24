import { ApiProperty } from "@nestjs/swagger";

export class CreateSkillFreelancerDto {
    @ApiProperty()
    skillId: number
    @ApiProperty()
    freelancerId: number
}
