import { HttpStatus } from '@nestjs/common'

export const AUTH_CONSTANTS = {
  USER_NOT_FOUND: {
    message: 'User not found.',
    code: HttpStatus.NOT_FOUND
  },
  USER_EXISTS: {
    message: 'User already exists.',
    code: HttpStatus.CONFLICT
  },
  USER_WRONG_PASSWORD: {
    message: 'Wrong password or email',
    code: HttpStatus.BAD_REQUEST
  }
} as const
