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

type TRoomType = (typeof RoomTypes)[keyof typeof RoomTypes]

export class PostRoomDto {
  @Min(1)
  @IsNumber()
  readonly room_number: number

  @IsEnum(RoomTypes, { message: 'Incorrect room type.' })
  @IsString()
  readonly room_type: TRoomType

  @IsBoolean()
  readonly is_sea_view: boolean

  @IsString()
  @MaxLength(1024)
  readonly room_description: string
}
