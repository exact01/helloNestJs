import { User, UserDocument } from './models'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { ICreateUser } from './interfaces'
import { Role } from '../common/decorators/roles'

export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) {}
  public async findUserByEmail(
    email: string
  ): Promise<UserDocument | undefined> {
    return this.userModel.findOne({ email })
  }

  public createUser({
    email,
    password,
    login,
    phone,
    role = Role.USER
  }: ICreateUser): Promise<UserDocument> {
    return this.userModel.create({
      email,
      hashPassword: password,
      phone,
      login,
      role
    })
  }

  public async getUserById(id: string): Promise<UserDocument | undefined> {
    return this.userModel.findOne({ _id: id })
  }

  public deleteUserFromEmail(email: string) {
    return this.userModel.deleteOne({ email })
  }
}
