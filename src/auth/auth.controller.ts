import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { AuthDto } from './dtos'
// TODO CONTROLLER
@Controller('auth')
export class AuthController {
  @HttpCode(201)
  @Post('register')
  public async register(@Body() dto: AuthDto) {
    return dto
  }

  @Post('login')
  public async login(@Body() dto: AuthDto) {
    return dto
  }
}
