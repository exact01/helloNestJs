import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { IJwtValidate } from '../../../auth/interfaces/jwt-validate.interface'

export const UserDataDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): IJwtValidate => {
    const request = ctx.switchToHttp().getRequest()
    return request.user
  }
)
