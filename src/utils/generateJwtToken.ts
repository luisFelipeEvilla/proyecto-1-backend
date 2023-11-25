import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

export function generateJwtToken(user: any) {
    const payload = {
        // Include user information you want to encode in the token
        userId: user._id,
        email: user.email,
        role: user.role
        // Add other claims as needed
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    return token;
}