import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/user/role/user.enum';

export const HasRoles = (...role: Role[]) => SetMetadata('role', role);