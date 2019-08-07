import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { Building } from '../entity/Building';
import { Room } from '../entity/Room';
import { BuildingService } from '../service/BuildingService';
import { RoomService } from '../service/RoomService';
import { BuildingInput } from './types/BuildingInput';
import { RoomInput } from './types/RoomInput';

@Resolver(of => Building)
export class BuildingResolver {

    constructor(private readonly buildingService: BuildingService,
                private readonly roomService: RoomService) {}

    @Query(returns => [Building])
    public buildings(): Promise<Building[]> {
        return this.buildingService.listAll();
    }

    @Mutation(returns => Building)
    public createBuilding(@Arg('building') buildingInput: BuildingInput): Promise<Building> {
        return this.buildingService.create(buildingInput);
    }

    @Mutation(returns => Room)
    public async createRoom(@Arg('room') roomInput: RoomInput): Promise<Room> {
        return this.roomService.create(roomInput);
    }

    @FieldResolver()
    public rooms(@Root() building: Building): Promise<Room[]> {
        return this.roomService.getByBuilding(building);
    }
}
