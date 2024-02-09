import { HttpException, HttpStatus } from '@nestjs/common'
import { ScheduleErrors, TScheduleErrorKey } from './errors'

export class ScheduleException extends HttpException {
  constructor(errorKey: TScheduleErrorKey) {
    const error = ScheduleErrors[errorKey] || {
      message: 'An unexpected error occurred',
      status: HttpStatus.INTERNAL_SERVER_ERROR
    }
    super(error.message, error.status)
  }
}
