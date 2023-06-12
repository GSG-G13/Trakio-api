import { Request } from 'express';
import { userData as UserDataInterface } from './userData';

export default interface TokenRequest extends Request {
    userData: UserDataInterface;
}
