import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { IJwtValidate } from '../../../auth/interfaces/jwt-validate.interface'
import { ScheduleService } from '../../../schedule/schedule.service'

@Injectable()
export class VerifyReservationOwnerGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly schedule: ScheduleService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const user = request.user as IJwtValidate
    const reservationId = request.body.id as string // Извлечение id резервации из тела запроса
    const emailToken = user.email

    try {
      const schedule = await this.schedule.getScheduleById({
        id: reservationId
      })
      const ownerEmail = schedule.email
      return emailToken === ownerEmail
    } catch (e) {
      return true
    }
  }
}
