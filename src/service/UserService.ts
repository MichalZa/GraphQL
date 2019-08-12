import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { User } from '../entity/User';

export class UserService {

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

    public listAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    public findById(id: number): Promise<User> {
        return this.userRepository.findOne(id);
    }
}
