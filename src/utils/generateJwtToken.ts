import jwt from 'jsonwebtoken';

export function generateJwtToken(user: any) {
    const payload = {
        // Include user information you want to encode in the token
        userId: user._id,
        email: user.email,
        // Add other claims as needed
    };

    const token = jwt.sign(payload, 'yourSecretKey', { expiresIn: '1h' });
    return token;
}