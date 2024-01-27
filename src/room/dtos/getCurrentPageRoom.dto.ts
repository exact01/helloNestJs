import { IsString, MinLength } from 'class-validator'

export class GetCurrentPageRoomDto {
  @IsString()
  @MinLength(1)
  readonly page: string
}
