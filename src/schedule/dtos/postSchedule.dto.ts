import {
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength
} from 'class-validator'

export class PostScheduleDto {
  @IsString()
  @MinLength(24)
  @MaxLength(24)
  room_id: string

  @IsNumber()
  @Min(1)
  @Max(31)
  day: number
}
