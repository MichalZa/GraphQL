import { FieldResolver, Query, Resolver, Root } from 'type-graphql';
import { Desk } from '../entity/Desk';
import { Room } from '../entity/Room';
import { DeskService } from '../service/DeskService';
import { RoomService } from '../service/RoomService';

@Resolver(type => Room)
export class RoomResolver {

    constructor(private readonly roomService: RoomService,
                private readonly deskService: DeskService) {}

    @Query(returns => [Room])
    public rooms(): Promise<Room[]> {
        return this.roomService.listAll();
    }

    @FieldResolver()
    public desks(@Root() room: Room): Promise<Desk[]> {
        return this.deskService.getByRoom(room);
    }
}
