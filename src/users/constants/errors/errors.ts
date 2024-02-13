import { HttpStatus } from '@nestjs/common'

export const UserErrors = {
  NOT_FOUND: {
    message: 'User not found',
    status: HttpStatus.NOT_FOUND
  },
  CONFLICT: {
    message: 'User already exists',
    status: HttpStatus.CONFLICT
  },
  USER_WRONG_PASSWORD_OR_EMAIL: {
    message: 'Wrong password or email',
    status: HttpStatus.BAD_REQUEST
  }
} as const
