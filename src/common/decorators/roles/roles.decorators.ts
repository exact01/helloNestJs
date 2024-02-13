import { SetMetadata } from '@nestjs/common'
import { ROLES_KEY, TKeyRole } from './role'

export const Roles = (...roles: TKeyRole[]) => SetMetadata(ROLES_KEY, roles)
