import { TKeyRole } from '../../common/decorators/roles/role'

export interface ICreateUser {
  email: string
  password: string
  phone: string
  login: string
  role?: TKeyRole
}
