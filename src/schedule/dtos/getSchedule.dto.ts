import { IsString, MaxLength, MinLength } from 'class-validator'

export class GetScheduleDto {
  @IsString()
  @MinLength(24)
  @MaxLength(24)
  id: string
}
