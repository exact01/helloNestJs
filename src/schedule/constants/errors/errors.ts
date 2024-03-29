import { HttpStatus } from '@nestjs/common'

export const ScheduleErrors = {
  SCHEDULE_NOT_FOUND: {
    message: 'Schedule not found.',
    status: HttpStatus.NOT_FOUND
  },
  SCHEDULE_EXISTS: {
    message: 'Schedule already exists.',
    status: HttpStatus.CONFLICT
  },
  SCHEDULE_VALIDATION_DAY: {
    message: 'StartDay must be before or equal to endDay',
    status: HttpStatus.BAD_REQUEST
  },
  SCHEDULE_FORBIDDEN_EMAIL: {
    message: 'Access is denied',
    status: HttpStatus.FORBIDDEN
  }
} as const
