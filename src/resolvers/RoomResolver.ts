import { Query, Resolver } from 'type-graphql';
import { Inject } from 'typedi';
import { Room } from '../entity/Room';
import { RoomService } from '../service/RoomService';

@Resolver(type => Room)
export class RoomResolver {

    constructor(@Inject() private readonly  roomService: RoomService) {}

    @Query(returns => [Room])
    public rooms(): Promise<Room[]> {
        return this.roomService.listAll();
    }
}
