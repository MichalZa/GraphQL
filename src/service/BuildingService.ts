import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Building } from '../entity/Building';

@Service()
export class BuildingService {

    constructor(@InjectRepository(Building) private readonly buildingRepository: Repository<Building>) {}

    public listAll(): Promise<Building[]> {
        return this.buildingRepository.find();
    }
}
