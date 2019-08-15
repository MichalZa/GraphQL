import { FieldResolver, Query, Resolver, Root } from 'type-graphql';
import { Profile } from '../entity/Profile';
import { User } from '../entity/User';
import { ProfileService } from '../service/ProfileService';
import { UserService } from '../service/UserService';

@Resolver(of => User)
export class UserResolver {

    constructor(private readonly userService: UserService,
                private readonly profileService: ProfileService) {}

    @Query(returns => [User])
    public users(): Promise<User[]> {
        return this.userService.listAll();
    }

    @FieldResolver()
    public profile(@Root() user: User): Promise<Profile> {
        return this.profileService.findByUserId(user.id);
    }
}
