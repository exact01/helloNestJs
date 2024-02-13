import { Role } from '../../src/common/decorators/roles'

export const USER_1 = {
  email: 'test1@example.com',
  password: 'password',
  login: 'testUser',
  phone: '123456789',
  role: Role.USER
}

export const USER_2 = {
  email: 'test2222@example.com',
  password: 'password1234',
  login: 'test2User',
  phone: '123456789',
  role: Role.ADMIN
}
