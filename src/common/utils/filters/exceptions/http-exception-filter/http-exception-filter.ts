import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException
} from '@nestjs/common'
import { Response } from 'express'
import { AppException } from '../app-exception'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: AppException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status = exception.getStatus()
    const timestamp = new Date().toISOString()
    const path = request.url

    const exceptionResponse = exception.getResponse()
    const message =
      typeof exceptionResponse === 'object'
        ? exceptionResponse['message']
        : exceptionResponse

    response.status(status).json({
      statusCode: status,
      message,
      timestamp,
      path
    })
  }
}
