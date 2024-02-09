import { HttpStatus } from '@nestjs/common'

export const RoomErrors = {
  ROOM_NOT_FOUND: {
    code: 'ROOM_NOT_FOUND',
    message: 'Room not found.',
    status: HttpStatus.NOT_FOUND
  },
  ROOM_EXISTS: {
    code: 'ROOM_EXISTS',
    message: 'Room already exists.',
    status: HttpStatus.CONFLICT
  }
} as const

export type TRoomErrorKey = keyof typeof RoomErrors
