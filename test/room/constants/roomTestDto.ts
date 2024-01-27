import { PostRoomDto } from '../../../src/room/dtos'
import { RoomTypes } from '../../../src/room/dtos/postRoomDto'

export const roomTestDto: PostRoomDto = {
  room_number: 1,
  room_type: RoomTypes.OneRoom,
  is_sea_view: true,
  room_description: 'Описание комнаты'
}
