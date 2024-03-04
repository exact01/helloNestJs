import { UserDocument } from '../models'

export class UserDto {
  public readonly _id: string
  public readonly login: string
  public readonly email: string

  constructor(userDb: UserDocument) {
    this._id = String(userDb.id)
    this.email = userDb.email
    this.login = userDb.email
  }
}
