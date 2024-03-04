import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator'

export class RegisterDto {
  @IsEmail()
  email: string

  @IsString()
  @MaxLength(64)
  @MinLength(8)
  password: string

  @IsString()
  @MaxLength(64)
  @MinLength(3)
  login: string

  @IsString()
  @MaxLength(11)
  @MinLength(11)
  phone: string
}
