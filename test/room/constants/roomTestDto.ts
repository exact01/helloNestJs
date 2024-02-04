import { PostRoomDto } from '../../../src/room/dtos'
import { RoomTypes } from '../../../src/room/dtos/postRoomDto'

export const roomTestDto: PostRoomDto = {
  roomNumber: 32131231232123,
  roomType: RoomTypes.OneRoom,
  isSeaView: true,
  roomDescription: 'Описание комнаты'
}
