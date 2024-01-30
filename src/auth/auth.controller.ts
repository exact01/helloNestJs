import {
  Body,
  ConflictException,
  Controller,
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { RegisterDto } from './dtos'
import { LoginDto } from './dtos/loginDto'
import { AuthService } from './auth.service'
import { AUTH_CONSTANTS } from './constants'
import { UsersService } from '../users/users.service'
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService
  ) {}
  @UsePipes(new ValidationPipe())
  @Post('signUp')
  public async signUp(@Body() dto: RegisterDto) {
    const isUser = await this.userService.findUser(dto.email)
    if (isUser) {
      throw new ConflictException(AUTH_CONSTANTS.USER_EXISTS)
    }

    return this.authService.signUp(dto)
  }

  @UsePipes(new ValidationPipe())
  @Post('signIn')
  public async signIn(@Body() { email, password }: LoginDto) {
    const user = await this.userService.validateUser(email, password)
    return this.authService.signIn(user)
  }
}
