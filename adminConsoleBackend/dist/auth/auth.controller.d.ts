import { LoginDTO } from './dto/login.dto';
import { IAuthService } from './interfaces/authService.interface';
import { LoginResponse } from './dto/loginResponse.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: IAuthService);
    logger: any;
    login(loginInfo: LoginDTO): Promise<LoginResponse>;
    refreshLoginToken(refreshToken: any): unknown;
}
