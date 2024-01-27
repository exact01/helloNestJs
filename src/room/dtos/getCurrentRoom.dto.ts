import { IsString, MaxLength, MinLength } from 'class-validator'

export class GetCurrentRoomDto {
  @IsString()
  @MinLength(24)
  @MaxLength(24)
  readonly id: string
}
