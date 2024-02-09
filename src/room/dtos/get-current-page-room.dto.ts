import { IsInt, Min } from 'class-validator'
import { Transform } from 'class-transformer'

export class GetCurrentPageRoomDto {
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  readonly page: string
}
