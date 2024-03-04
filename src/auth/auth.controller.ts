import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { RegisterDto } from './dtos'
import { LoginDto } from './dtos/login.dto'
import { AuthService } from './auth.service'

@Controller('auth')
@UsePipes(new ValidationPipe())
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  public async signUp(@Body() dto: RegisterDto) {
    return this.authService.signUp(dto)
  }

  @Post('sign-in')
  public async signIn(@Body() dto: LoginDto) {
    return this.authService.signIn(dto)
  }
}
