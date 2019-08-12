import { FieldResolver, Query, Resolver, Root } from 'type-graphql';
import { Desk } from '../entity/Desk';
import { User } from '../entity/User';
import { UserService } from '../service/UserService';

@Resolver(type => Desk)
export class DeskResolver {

    constructor(private readonly userService: UserService) {}

    @FieldResolver()
    public user(@Root() desk: Desk): Promise<User> {
        return this.userService.findById(desk.userId);
    }
}
