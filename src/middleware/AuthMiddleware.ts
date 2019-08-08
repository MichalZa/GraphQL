import Container from 'typedi';
import { User } from '../entity/User';
import { JwtService } from './../service/JwtService';

export const authMiddleware = async (req: any, res: any, next: any) => {

    const requestToken: string = req.headers.authorization;

    if (!requestToken) {
        next(new Error('Invalid token'));
    }

    const jwtService: JwtService = Container.get(JwtService);

    const tokenUser: User = await jwtService.getTokenUser(requestToken);

    req.currentUser = tokenUser;

    next();
};
