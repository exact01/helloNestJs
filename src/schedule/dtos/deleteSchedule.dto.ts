import { IsString, MaxLength, MinLength } from 'class-validator'

export class DeleteScheduleDto {
  @IsString()
  @MinLength(24)
  @MaxLength(24)
  id: string
}
