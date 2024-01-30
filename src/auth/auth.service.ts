import { Injectable } from '@nestjs/common'
import { RegisterDto } from './dtos'
import { LoginDto } from './dtos/loginDto'
import { User, UserDocument } from '../users/models'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { genSalt, hash } from 'bcryptjs'
import { ConfigService } from '@nestjs/config'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
@Injectable()
export class AuthService {
  protected readonly salt: number
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private configService: ConfigService,
    private userService: UsersService,
    private jwtService: JwtService
  ) {
    this.salt = Number(configService.get<string>('SALT').trim())
  }

  public async signIn({ email }: Pick<LoginDto, 'email'>) {
    const payload = { email }
    return { access_token: await this.jwtService.signAsync(payload) }
  }

  public async signUp({
    login,
    password: pass,
    phone,
    email
  }: RegisterDto): Promise<any> {
    const salt = await genSalt(this.salt)
    const newUser = new this.userModel({
      email,
      hashPassword: await hash(pass, salt),
      phone,
      login,
      role: 'user'
    })

    return newUser.save()
  }
}
