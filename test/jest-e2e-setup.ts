// test.setup.ts
import { NestFactory } from '@nestjs/core'
import { AppModule } from '../src/app.module'
import { UsersService } from '../src/users/users.service'
import { USER_1, USER_2 } from './constants'

export default async function createTestUsers() {
  const app = await NestFactory.createApplicationContext(AppModule)
  const usersService = app.get(UsersService)
  await usersService.createUser(USER_2)
  await usersService.createUser(USER_1)
  await app.close()
}
