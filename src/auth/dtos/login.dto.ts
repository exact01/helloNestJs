import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator'

export class LoginDto {
  @IsEmail()
  email: string

  @IsString()
  @MaxLength(64)
  @MinLength(8)
  password: string
}
