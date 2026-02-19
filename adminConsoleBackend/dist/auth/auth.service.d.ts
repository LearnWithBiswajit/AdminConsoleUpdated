import { Logger } from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { IAuthService } from './interfaces/authService.interface';
import { LoginResponse } from './dto/loginResponse.dto';
import { IUserRepository } from 'src/modules/users/interfaces/users.interface';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService implements IAuthService {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: IUserRepository, jwtService: JwtService);
    logger: Logger;
    loginUser(loginInfo: LoginDTO): Promise<LoginResponse>;
    createRefreshToken(accessToken: string): Promise<string>;
    refreshLoginToken(refreshToken: string): Promise<any>;
}
