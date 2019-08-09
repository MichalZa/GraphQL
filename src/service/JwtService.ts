import * as jwt from 'jsonwebtoken';
import * as conf from 'nconf';
import { Repository } from 'typeorm';
import { User } from '../entity/User';

export class JwtService {

    constructor(private readonly userRepository: Repository<User>) {}

    public async getTokenUser(token: string): Promise<User> {
        const verifiedToken: any = this.verify(token);

        const user: User = await this.
        userRepository.findOne({ email: verifiedToken.email });

        if (!user) {
            throw new Error('User does not exist');
        }

        return user;
    }

    public verify(token: string): object | string {
        return jwt.verify(token, conf.get('jwt').signature);
    }
}
