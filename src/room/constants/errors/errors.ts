import { HttpStatus } from '@nestjs/common'

export const RoomErrors = {
  ROOM_NOT_FOUND: {
    message: 'Room not found.',
    status: HttpStatus.NOT_FOUND
  },
  ROOM_EXISTS: {
    message: 'Room already exists.',
    status: HttpStatus.CONFLICT
  }
} as const
