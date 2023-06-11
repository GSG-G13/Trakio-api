import { Request, Response } from 'express';

const logout = (req: Request, res: Response) => {
  res.clearCookie('token').json({ message: 'Logged Out Sucssesfully' });
};
export default logout;
