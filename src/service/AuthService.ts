import * as bcrypt from 'bcrypt-nodejs';
import { NotFoundError, UnauthorizedError } from 'routing-controllers';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import AuthLoginDto from '../dto/AuthLoginDto';
import { User } from '../entity/User';
import { JwtService } from './JwtService';

export class AuthService {

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
                private readonly jwtService: JwtService) {}

    public async login(data: AuthLoginDto): Promise<{ token: string }> {
        const user: User = await this.userRepository.findOneOrFail({ email: data.email }).catch((error: any) => {
            throw new NotFoundError('User does not exist');
        });

        const isCorrectPassword: boolean = bcrypt.compareSync(data.password, user.password);
        if (!isCorrectPassword) {
            throw new UnauthorizedError('Incorrect password provided');
        }

        const token: string = await this.jwtService.createToken(user);

        return { token };
    }
}
