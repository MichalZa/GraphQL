import { FieldResolver, Query, Resolver, Root } from 'type-graphql';
import { Building } from '../entity/Building';
import { Room } from '../entity/Room';
import { BuildingService } from '../service/BuildingService';
import { RoomService } from '../service/RoomService';

@Resolver(of => Building)
export class BuildingResolver {

    constructor(private readonly buildingService: BuildingService,
                private readonly roomService: RoomService) {}

    @Query(returns => [Building])
    public buildings(): Promise<Building[]> {
        return this.buildingService.listAll();
    }

    @FieldResolver()
    public rooms(@Root() building: Building): Promise<Room[]> {
        return this.roomService.getByBuilding(building);
    }
}
