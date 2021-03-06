import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { Building } from '../entity/Building';
import { Room } from '../entity/Room';
import { BuildingService } from '../service/BuildingService';
import { RoomService } from '../service/RoomService';
import { BuildingInput } from './types/BuildingInput';

@Resolver(of => Building)
export class BuildingResolver {

    constructor(private readonly buildingService: BuildingService,
                private readonly roomService: RoomService) {}

    @Query(returns => [Building])
    public buildings(@Arg('city', { nullable: true }) city?: string): Promise<Building[]> {
        return this.buildingService.listAll(city);
    }

    @Mutation(returns => Building)
    public createBuilding(@Arg('building') buildingInput: BuildingInput): Promise<Building> {
        return this.buildingService.create(buildingInput);
    }

    @FieldResolver()
    public rooms(@Root() building: Building, @Arg('type', { nullable: true }) type?: string): Promise<Room[]> {
        return this.roomService.findByBuilding(building, type);
    }
}
