import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Building } from '../entity/Building';
import { BuildingInput } from '../resolvers/types/BuildingInput';

@Service()
export class BuildingService {

    constructor(@InjectRepository(Building) private readonly buildingRepository: Repository<Building>) {}

    public listAll(city?: string): Promise<Building[]> {
        if (city) {
            return this.buildingRepository.find({ city });
        }

        return this.buildingRepository.find();
    }

    public create(buildingInput: BuildingInput): Promise<Building> {
        return this.buildingRepository.save({
            city: buildingInput.city,
        });
    }

    public findById(id: number): Promise<Building> {
        return this.buildingRepository.findOne(id);
    }
}
