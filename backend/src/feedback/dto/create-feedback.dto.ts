import { ApiProperty } from "@nestjs/swagger";

export class CreateFeedbackDto {

    @ApiProperty()
    workId:number
    @ApiProperty()
    freelancerId:number
    @ApiProperty()
    rate:number
    @ApiProperty()
    text:string
}
