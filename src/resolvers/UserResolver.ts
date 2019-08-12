import { Query, Resolver } from 'type-graphql';
import { User } from '../entity/User';
import { UserService } from '../service/UserService';

@Resolver(of => User)
export class UserResolver {

    constructor(private readonly userService: UserService) {}

    @Query(returns => [User])
    public users(): Promise<User[]> {
        return this.userService.listAll();
    }

}
