import { Request, Response } from 'express';

const logout = (req: Request, res: Response) => {
  res.clearCookie('token').json({ message: 'Logged Out Successfully' });
};

export default logout;
