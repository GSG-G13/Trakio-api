import { Response, NextFunction } from 'express';
import { verifyToken, CustomError } from '../helpers';
import { TokenRequest, userData } from '../interfaces';

const checkAuth = (req:TokenRequest, res: Response, next:NextFunction) => {
  const { token } = req.cookies;
  if (!token) {
    throw new CustomError(401, 'forbidden');
  }

  verifyToken(token)
    .then((decodedToken) => {
      req.userData = decodedToken as userData;
      next();
    })
    .catch(() => {
      next(new CustomError(498, 'Invalid token'));
    });
};

export default checkAuth;
