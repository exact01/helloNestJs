import { HttpStatus } from '@nestjs/common'

export type TExceptionError = {
  code: string
  message: string
  status: HttpStatus
}

export type TExceptionErrorsType = Record<string, TExceptionError>
