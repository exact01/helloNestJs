import {
  IsString,
  IsBoolean,
  IsNumber,
  Min,
  IsEnum,
  MaxLength
} from 'class-validator'
export enum RoomTypes {
  OneRoom = 'Одна комната',
  TwoRooms = 'Две комнаты',
  ThreeRooms = 'Три комнаты',
  FourRooms = 'Четыре комнаты',
  FiveRooms = 'Пять комнат',
  SixRooms = 'Шесть комнат',
  SevenRooms = 'Семь комнат',
  EightRooms = 'Восемь комнат',
  NineRooms = 'Девять комнат',
  TenRooms = 'Десять комнат'
}

export type TRoomType = (typeof RoomTypes)[keyof typeof RoomTypes]

export class PostRoomDto {
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
}
