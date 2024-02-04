import {
  IsISO8601,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength
} from 'class-validator'

export class PatchScheduleDto {
  @IsNotEmpty()
  @IsISO8601()
  @IsString()
  startDay: string

  @IsNotEmpty()
  @IsISO8601()
  @IsString()
  endDay: string

  @IsString()
  @MinLength(24)
  @MaxLength(24)
  id: string
}
