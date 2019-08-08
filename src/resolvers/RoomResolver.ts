import { Query, Resolver } from 'type-graphql';
import { Room } from '../entity/Room';
import { RoomService } from '../service/RoomService';

@Resolver(type => Room)
export class RoomResolver {

    constructor(private readonly  roomService: RoomService) {}

    @Query(returns => [Room])
    public rooms(): Promise<Room[]> {
        return this.roomService.listAll();
    }
}
