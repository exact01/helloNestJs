import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AUTH_CONSTANTS } from '../auth/constants'
import { compare } from 'bcryptjs'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { UserDocument, User } from './models'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  public async findUser(email: string): Promise<User> {
    return this.userModel.findOne({ email })
  }

  public async validateUser(
    email: string,
    password: string
  ): Promise<Pick<User, 'email'>> {
    const user = await this.findUser(email)
    if (!user) {
      throw new UnauthorizedException(AUTH_CONSTANTS.USER_NOT_FOUND)
    }

    const isCorrectPassword = await compare(password, user.hashPassword)
    if (!isCorrectPassword) {
      throw new UnauthorizedException(AUTH_CONSTANTS.USER_WRONG_PASSWORD)
    }

    return {
      email: user.email
    }
  }
}
