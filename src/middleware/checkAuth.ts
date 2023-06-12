import { Response, NextFunction } from 'express';
import { verifyToken, CustomError } from '../helper';
import { TokenRequest } from '../interfaces';

const authCheck = (req:TokenRequest, res: Response, next:NextFunction) => {
  const { token } = req.cookies;
  if (!token) {
    req.userData = undefined;
    next(new CustomError(401, 'forbidden'));
    return;
  }

  verifyToken(token)
    .then((decodedToken) => {
      req.userData = JSON.parse(decodedToken);
      next();
    })
    .catch(() => {
      next(new CustomError(498, 'Invalid token'));
    });
};

export default authCheck;
