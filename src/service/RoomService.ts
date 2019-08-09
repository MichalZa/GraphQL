import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import NotFoundError from '../common/error/type/NotFoundError';
import { Building } from '../entity/Building';
import { Room } from '../entity/Room';
import { RoomInput } from '../resolvers/types/RoomInput';
import { BuildingService } from './BuildingService';

@Service()
export class RoomService {

    constructor(@InjectRepository(Room) private readonly roomRepository: Repository<Room>,
                private readonly buildingService: BuildingService) {}

    public getByBuilding(building: Building): Promise<Room[]> {
        return this.roomRepository.find({ where: { building } });
    }

    public listAll(): Promise<Room[]> {
        return this.roomRepository.find();
    }

    public async create(roomInput: RoomInput): Promise<Room> {
        const building: Building = await this.buildingService.findById(roomInput.buildingId);

        if (!building) {
            throw new NotFoundError('Building not found');
        }

        const room: Room = this.roomRepository.create({
            ...roomInput,
            building,
        });

        return this.roomRepository.save(room);
    }
}
