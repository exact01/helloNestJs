import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { AuthDto } from './dtos'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  // TODO DELETE ANY
  public async login({ login, password: pass }: AuthDto): Promise<any> {
    //TODO HASH PASSWORD
    const user = await this.usersService.findOne(login)
    if (!user) {
      throw new UnauthorizedException()
    }
    if (user.password !== pass) {
      throw new UnauthorizedException()
    }
    const { password: _password, ...result } = user
    // TODO jwtAuth
    return result
  }
  // TODO DELETE ANY
  public async register({ login, password: _pass }: AuthDto): Promise<any> {
    const user = await this.usersService.findOne(login)
    if (user) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT)
    }
    // TODO GENERATE HASH PASSWORD
    // TODO CREATE USER IN DB
    const { password: _password, ...result } = user
    // TODO: CREATE JWT
    return result
  }
}
