import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { Desk } from '../entity/Desk';
import { User } from '../entity/User';
import { DeskService } from '../service/DeskService';
import { UserService } from '../service/UserService';
import { DeskInput } from './types/DeskInput';

@Resolver(type => Desk)
export class DeskResolver {

    constructor(private readonly userService: UserService,
                private readonly deskService: DeskService) {}

    @Query(returns => [Desk])
    public desks(): Promise<Desk[]> {
        return this.deskService.listAll();
    }

    @Mutation(returns => Desk)
    public createDesk(@Arg('desk') deskInput: DeskInput): Promise<Desk> {
        return this.deskService.create(deskInput);
    }

    @FieldResolver()
    public user(@Root() desk: Desk): Promise<User> {
        return desk.userId ? this.userService.findById(desk.userId) : null;
    }
}
