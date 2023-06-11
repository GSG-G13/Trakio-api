import { Request, Response } from 'express';

const logout = (req: Request, res: Response) => {
  res.clearCookie('token').redirect('/');
};
export default logout;
