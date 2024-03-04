import { Injectable } from '@nestjs/common'
import { compare, genSalt, hash } from 'bcryptjs'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { UserDocument, User } from './models'
import { ICreateUser, IAuthUser } from './interfaces'
import { ConfigService } from '@nestjs/config'
import { UsersRepository } from './users.repository'
import { UserDto } from './dtos/user.dto'
import { AppException } from '../common/utils/filters/exceptions/app-exception'
import { UserErrors } from './constants/errors/errors'
import { Role } from '../common/decorators/roles'

@Injectable()
export class UsersService {
  protected salt: number
  constructor(
    private readonly configService: ConfigService,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly usersRepository: UsersRepository
  ) {
    this.salt = Number(configService.get<string>('SALT').trim())
  }

  public async findUser(email: string): Promise<UserDto> {
    const user = await this.usersRepository.findUserByEmail(email)
    if (!user) {
      throw new AppException(UserErrors.NOT_FOUND)
    }

    return new UserDto(user)
  }

  public async createUser({
    email,
    password,
    phone,
    login,
    role = Role.USER
  }: ICreateUser): Promise<IAuthUser> {
    const user = await this.usersRepository.findUserByEmail(email)

    if (user) {
      throw new AppException(UserErrors.CONFLICT)
    }

    const salt = await genSalt(this.salt)
    const hashPassword = await hash(password, salt)
    const newUser = await this.usersRepository.createUser({
      email,
      password: hashPassword,
      phone,
      login,
      role
    })

    return {
      email: newUser.email,
      role: newUser.role
    }
  }

  public async deleteUserFromEmail(email: string) {
    return this.usersRepository.deleteUserFromEmail(email)
  }

  public async validateUser(
    email: string,
    password: string
  ): Promise<IAuthUser> {
    const user = await this.usersRepository.findUserByEmail(email)
    if (!user) {
      throw new AppException(UserErrors.USER_WRONG_PASSWORD_OR_EMAIL)
    }

    const isCorrectPassword = await compare(password, user.hashPassword)
    if (!isCorrectPassword) {
      throw new AppException(UserErrors.USER_WRONG_PASSWORD_OR_EMAIL)
    }

    return {
      email: user.email,
      role: user.role
    }
  }
}
