export const Role = {
  USER: 'user',
  ADMIN: 'admin'
} as const

export const ROLES_KEY = 'roles'

export type TRole = typeof Role
export type TKeyRole = (typeof Role)[keyof typeof Role]
