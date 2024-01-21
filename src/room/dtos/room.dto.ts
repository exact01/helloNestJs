enum RoomTypes {
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

export class RoomDto {
  readonly room_number: number
  readonly room_type: TRoomType
  readonly is_sea_view: boolean
  readonly room_description: string
}
