import { Request, Response } from 'express';
import Container from 'typedi';
import AuthError from '../common/error/type/AuthError';
import { User } from '../entity/User';
import { JwtService } from './../service/JwtService';

export const authMiddleware = async (req: any, res: any, next: any) => {

    const requestToken: string = req.headers.authorization;

    if (!requestToken) {
        next(new AuthError('Invalid token'));
    }

    const jwtService: JwtService = Container.get(JwtService);

    const tokenUser: User = await jwtService.getUserByToken(requestToken);

    req.user = tokenUser;

    next();
};
