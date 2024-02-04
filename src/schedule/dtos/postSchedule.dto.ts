import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsISO8601
} from 'class-validator'

export class PostScheduleDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(24)
  @MaxLength(24)
  roomId: string

  @IsNotEmpty()
  @IsISO8601()
  @IsString()
  startDay: string

  @IsNotEmpty()
  @IsISO8601()
  @IsString()
  endDay: string
}
