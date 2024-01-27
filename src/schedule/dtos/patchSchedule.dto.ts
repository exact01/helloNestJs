import { PostScheduleDto } from './postSchedule.dto'
import { IsString, MaxLength, MinLength } from 'class-validator'

export class PatchScheduleDto extends PostScheduleDto {
  @IsString()
  @MinLength(24)
  @MaxLength(24)
  id: string
}
