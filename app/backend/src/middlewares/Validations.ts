import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

class Validations {
  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const user = req.body;
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!user.email || !user.password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (!validEmail.test(user.email)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    if (user.password === undefined || user.password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  }

  static TokenValidation(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization;

      if (!token) return res.status(401).json({ message: 'Token not found' });

      const verification = verify(token, 'jwt_secret');

      res.locals.user = verification;

      next();
    } catch {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}
export default Validations;
