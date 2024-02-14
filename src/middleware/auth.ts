import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
    user: { id: string }; // Modify this according to your user object structure
}

export type MiddlewareFunction = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => any;

export const authMiddleware: MiddlewareFunction = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'anudeepPandit');
        req.user = decoded.user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid Token' });
    }
};
