import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Desk } from '../entity/Desk';
import { Room } from '../entity/Room';

export class DeskService {

    constructor(@InjectRepository(Desk) private readonly deskRepository: Repository<Desk>) {}

    public listAll(): Promise<Desk[]> {
        return this.deskRepository.find();
    }

    public getByRoom(room: Room): Promise<Desk[]> {
        return this.deskRepository.find({ where: { room } });
    }
}
