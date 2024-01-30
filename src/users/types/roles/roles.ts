import { Role } from '../../constants/role'

export type TRole = (typeof Role)[keyof typeof Role]
