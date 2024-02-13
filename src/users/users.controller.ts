import { Controller, Get, UseFilters, UseGuards } from '@nestjs/common'
import { HttpExceptionFilter } from '../common/utils/filters/exceptions/http-exception-filter'
import { JwtAuthGuard } from '../common/guards/jwt'
import { UserDataDecorator } from '../common/decorators/userData'
import { UsersService } from './users.service'
import { IJwtValidate } from '../auth/interfaces/jwt-validate.interface'

@UseGuards(JwtAuthGuard)
@UseFilters(HttpExceptionFilter)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/me')
  async getUserMe(@UserDataDecorator() { email }: IJwtValidate) {
    return this.userService.findUser(email)
  }
}
