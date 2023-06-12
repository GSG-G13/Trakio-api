import { Request } from 'express';
import userData from './userData';

export default interface TokenRequest extends Request {
    userData: userData;
}
