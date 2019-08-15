import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Profile } from '../entity/Profile';

export class ProfileService {

    constructor(@InjectRepository(Profile) private readonly profileRepository: Repository<Profile>) {}

    public findByUserId(userId: number): Promise<Profile> {
        return this.profileRepository.findOne({ userId });
    }
}
