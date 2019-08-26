import * as jwt from 'jsonwebtoken';
import * as conf from 'nconf';
import { UnauthorizedError } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import NotFoundError from '../common/error/type/NotFoundError';
import { User } from '../entity/User';

export class JwtService {

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

    public createToken(user: User): string {
        return user.generateAuthToken();
    }

    public async getUserByToken(token: string): Promise<User> {
        const verifiedToken: any = this.verifyToken(token);

        const user: User = await this.userRepository.findOne({ email: verifiedToken.email });

        if (!user) {
            throw new NotFoundError('User does not exist');
        }

        return user;
    }

    public verifyToken(token: string): object | string {
        try {
            return jwt.verify(token, conf.get('jwt').signature);
        } catch (error) {
            throw new UnauthorizedError();
        }
    }
}
