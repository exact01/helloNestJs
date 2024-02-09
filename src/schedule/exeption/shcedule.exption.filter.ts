import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common'
import { Response } from 'express'
import { ScheduleException } from './schedule.exeption'

@Catch(ScheduleException)
export class ScheduleExceptionFilter implements ExceptionFilter {
  catch(exception: ScheduleException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const status = exception.getStatus()
    const request = ctx.getRequest<Request>()
    const message = exception.getResponse()

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: message,
      path: request.url
    })
  }
}
