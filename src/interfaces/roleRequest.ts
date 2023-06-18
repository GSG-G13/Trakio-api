/* eslint-disable import/no-cycle */
import { TokenRequest } from './index';

type roleType = 'manager' | 'member';

interface RoleRequest extends TokenRequest {
    userRole? : roleType
}

export { RoleRequest, roleType };
