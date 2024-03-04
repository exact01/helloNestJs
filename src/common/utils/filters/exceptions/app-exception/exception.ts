import { HttpException, HttpStatus } from '@nestjs/common'
import { TExceptionError } from './types'

export class AppException extends HttpException {
  constructor(error: TExceptionError) {
    const errorMessage = error?.message || 'An unexpected error occurred'
    const errorCode = error?.status || HttpStatus.INTERNAL_SERVER_ERROR
    super(errorMessage, errorCode)
  }
}
