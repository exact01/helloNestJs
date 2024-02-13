import { HttpStatus } from '@nestjs/common'

export type TExceptionError = {
  message: string
  status: HttpStatus
}
