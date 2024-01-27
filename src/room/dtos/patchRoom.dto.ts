import { PostRoomDto } from './postRoomDto'
import { GetCurrentRoomDto } from './getCurrentRoom.dto'
import { IsString, MaxLength, MinLength } from 'class-validator'

export class PatchRoomDto extends PostRoomDto implements GetCurrentRoomDto {
  @IsString()
  @MinLength(24)
  @MaxLength(24)
  readonly id: string
}
