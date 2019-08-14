import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { Desk } from '../entity/Desk';
import { Room } from '../entity/Room';
import { DeskService } from '../service/DeskService';
import { RoomService } from '../service/RoomService';
import { RoomInput } from './types/RoomInput';

@Resolver(type => Room)
export class RoomResolver {

    constructor(private readonly roomService: RoomService,
                private readonly deskService: DeskService) {}

    @Query(returns => [Room])
    public rooms(): Promise<Room[]> {
        return this.roomService.listAll();
    }

    @Mutation(returns => Room)
    public async createRoom(@Arg('room') roomInput: RoomInput): Promise<Room> {
        return this.roomService.create(roomInput);
    }

    @FieldResolver()
    public desks(@Root() room: Room): Promise<Desk[]> {
        return this.deskService.findByRoom(room);
    }
}
