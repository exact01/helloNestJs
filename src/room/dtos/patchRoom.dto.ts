import { RoomTypes, TRoomType } from './postRoomDto'

import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsString,
  MaxLength,
  Min,
  MinLength
} from 'class-validator'

export class PatchRoomDto {
  @Min(1)
  @IsNumber()
  readonly roomNumber: number

  @IsEnum(RoomTypes, { message: 'Incorrect room type.' })
  @IsString()
  readonly roomType: TRoomType

  @IsBoolean()
  readonly isSeaView: boolean

  @IsString()
  @MaxLength(1024)
  readonly roomDescription: string
  @IsString()
  @MinLength(24)
  @MaxLength(24)
  readonly id: string
}
