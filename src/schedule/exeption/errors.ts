import { HttpStatus } from '@nestjs/common'

export const ScheduleErrors = {
  SCHEDULE_NOT_FOUND: {
    code: 'SCHEDULE_NOT_FOUND',
    message: 'Schedule not found.',
    status: HttpStatus.NOT_FOUND
  },
  SCHEDULE_EXISTS: {
    code: 'SCHEDULE_EXISTS',
    message: 'Schedule already exists.',
    status: HttpStatus.CONFLICT
  },
  SCHEDULE_VALIDATION_DAY: {
    code: 'SCHEDULE_VALIDATION_DAY',
    message: 'StartDay must be before or equal to endDay',
    status: HttpStatus.BAD_REQUEST
  }
} as const

export type TScheduleErrorKey = keyof typeof ScheduleErrors
