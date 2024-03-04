import { IsInt, IsNotEmpty, Max, Min } from 'class-validator'
import { Type } from 'class-transformer'

export class GetScheduleDto {
  @IsNotEmpty()
  @IsInt()
  @Min(2000)
  @Max(3000)
  @Type(() => Number)
  year: number

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(12)
  @Type(() => Number)
  month: number
}
