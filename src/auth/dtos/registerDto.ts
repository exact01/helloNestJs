import { IsString, MaxLength, MinLength } from 'class-validator'
import { LoginDto } from './loginDto'

export class RegisterDto extends LoginDto {
  @IsString()
  @MaxLength(64)
  @MinLength(3)
  login: string

  @IsString()
  @MaxLength(11)
  @MinLength(11)
  phone: string
}
