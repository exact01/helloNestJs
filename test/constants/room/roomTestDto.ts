import { RoomDto } from '../../../src/room/dtos'
import { RoomTypes } from '../../../src/room/dtos/room.dto'

export const roomTestDto: RoomDto = {
  room_number: 1,
  room_type: RoomTypes.OneRoom,
  is_sea_view: true,
  room_description: 'Описание комнаты'
}
