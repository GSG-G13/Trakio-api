import { Request } from 'express';
import UserDataInterface from './userData';

export default interface TokenRequest extends Request {
    userData?: UserDataInterface | undefined;
}
