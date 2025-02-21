import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/modules/enums';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
