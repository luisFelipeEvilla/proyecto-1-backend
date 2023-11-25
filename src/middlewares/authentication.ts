
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

const authenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // Get the JWT token from the request headers
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify and decode the JWT token
        const decoded = jwt.verify(token, JWT_SECRET);

        // @ts-ignore
        req.user = decoded;

        // Call the next middleware
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }

}

export default authenticationMiddleware;
