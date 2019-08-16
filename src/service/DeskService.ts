import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import NotFoundError from '../common/error/type/NotFoundError';
import { Desk } from '../entity/Desk';
import { Room } from '../entity/Room';
import { DeskInput } from '../resolvers/types/DeskInput';
import { RoomService } from './RoomService';

export class DeskService {

    constructor(@InjectRepository(Desk) private readonly deskRepository: Repository<Desk>,
                private readonly roomService: RoomService) {}

    public listAll(): Promise<Desk[]> {
        return this.deskRepository.find();
    }

    public findByRoom(room: Room): Promise<Desk[]> {
        return this.deskRepository.find({ where: { room } });
    }

    public async create(deskInput: DeskInput): Promise<Desk> {
        const room: Room = await this.roomService.findById(deskInput.roomId);

        if (!room) {
            throw new NotFoundError('Room with provided id does not exist');
        }

        const desk: Desk = this.deskRepository.create({
            internalId: deskInput.internalId,
            room,
        });

        return await this.deskRepository.save(desk);
    }
}
