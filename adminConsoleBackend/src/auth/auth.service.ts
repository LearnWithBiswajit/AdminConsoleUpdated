import { ForbiddenException, Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { IAuthService } from './interfaces/authService.interface';
import { LoginResponse } from './dto/loginResponse.dto';
import { IUserRepository, IUserService } from 'src/modules/users/interfaces/users.interface';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { UserRole } from 'src/config/enum.config';
import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class AuthService implements IAuthService {
    constructor(@Inject("IUserRepository") private readonly userRepository: IUserRepository, private readonly jwtService: JwtService) { }
    logger:Logger = new Logger();

    public async loginUser(loginInfo: LoginDTO): Promise<LoginResponse> {
        try {
            // Get User Info

            const user: User | null = await this.userRepository.getUserByEmail(loginInfo.email);

            // Check User Exists Or Not and User is Admin or SuperAdmin
            if (!user || (user.role !== UserRole.Admin && user.role !== UserRole.SuperAdmin) ) {
                throw new UnauthorizedException("Invalid Email or Password");
            }

            // Verify the Password
            let verifyComplete = await bcrypt.compare(loginInfo.password, user.password);

            if(!verifyComplete){
                throw new UnauthorizedException("Invalid Email or Password");
            }
            // Generate Token
            const accessToken =await this.jwtService.signAsync({email:user.email});
            const loginResponse:LoginResponse = new LoginResponse;
            loginResponse.accessToken = accessToken;
            loginResponse.refreshToken = await this.createRefreshToken(accessToken);
            return Promise.resolve(loginResponse);
        } catch (error) {
            this.logger.error(error);
            throw new ForbiddenException("Invalid Email or Password");
        }
    }

    async createRefreshToken(accessToken: string): Promise<string> {
        const refreshToken = this.jwtService.sign({accessToken:accessToken},{expiresIn: '2m' });
        return refreshToken;
    }

    public async refreshLoginToken(refreshToken:string):Promise<any>{
        try{
            const decoded = this.jwtService.decode(refreshToken);
            console.log(decoded);
            // let user=await this.fineone(decoded.email)

            // const decoded=this.jwtService.verify(refreshToken);
            // console.log(decoded);
            let decodedAccessToken=this.jwtService.decode(decoded.accessToken)
            const user = await this.userRepository.getUserByEmail(decodedAccessToken.email);
            if (!user || (user.role !== UserRole.Admin && user.role !== UserRole.SuperAdmin)) {
                throw new UnauthorizedException('Invalid refresh token');
            }
            const newAccessToken=await this.jwtService.signAsync({email:decodedAccessToken.email});
            const newRefreshToken =await this.jwtService.signAsync({accessToken:newAccessToken}, { expiresIn: '7d' });
            const loginResponse:LoginResponse = new LoginResponse;
            loginResponse.accessToken = newAccessToken;
            loginResponse.refreshToken = newRefreshToken;
            return {loginResponse};
        }catch(error){
            this.logger.error(error);
            throw new UnauthorizedException("Invalid or expired refresh token");
        }
    }
}
