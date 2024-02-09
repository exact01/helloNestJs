import { HttpException, HttpStatus } from '@nestjs/common'
import { RoomErrors, TRoomErrorKey } from './errors'

export class RoomException extends HttpException {
  constructor(errorKey: TRoomErrorKey) {
    const error = RoomErrors[errorKey] || {
      message: 'An unexpected error occurred',
      status: HttpStatus.INTERNAL_SERVER_ERROR
    }
    super(error.message, error.status)
  }
}
