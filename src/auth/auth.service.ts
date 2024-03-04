import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { IAuthResponse, ISignIn, ISignUp } from './interfaces'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService
  ) {}

  public async signIn({ email, password }: ISignIn): Promise<IAuthResponse> {
    const user = await this.userService.validateUser(email, password)
    const payload = { email: user.email, role: user.role }

    return { accessToken: await this.jwtService.signAsync(payload) }
  }

  public async signUp({
    login,
    password,
    phone,
    email
  }: ISignUp): Promise<IAuthResponse> {
    const payload = await this.userService.createUser({
      login,
      password,
      phone,
      email
    })

    return {
      accessToken: await this.jwtService.signAsync({
        email: payload.email,
        role: payload.role
      })
    }
  }
}
