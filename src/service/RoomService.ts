import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Building } from '../entity/Building';
import { Room } from '../entity/Room';

@Service()
export class RoomService {

    constructor(@InjectRepository(Room) private readonly roomRepository: Repository<Room>) {}

    public getByBuilding(building: Building): Promise<Room[]> {
        return this.roomRepository.find({ where: { building } });
    }
}
