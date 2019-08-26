import { Body, JsonController, Post } from 'routing-controllers';
import AuthLoginDto from '../dto/AuthLoginDto';
import { AuthService } from '../service/AuthService';

@JsonController('/auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('/login')
    public login(@Body() data: AuthLoginDto) {
        return this.authService.login(data);
    }
}
