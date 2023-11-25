
import { Request, Response, NextFunction } from 'express';

const authorizationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Check if the user is authorized
  //@ts-ignore
  if (req.user && req.user.role === 'admin') {
    // User is authorized, proceed to the next middleware or route handler
    next();
  } else {
    // User is not authorized, send a 403 Forbidden response
    res.sendStatus(403);
  }
};

export default authorizationMiddleware;
