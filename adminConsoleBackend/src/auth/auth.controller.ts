import { Body, Controller, Header, Headers, Inject, Logger, Post, Req } from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { IAuthService } from './interfaces/authService.interface';
import { LoginResponse } from './dto/loginResponse.dto';
import { Public } from 'src/decorators/publicRoute.decorator';

@Controller('auth')
export class AuthController {
    constructor(@Inject("IAuthService") private readonly authService:IAuthService){}
    logger = new Logger();

    @Public()
    @Post("/login")
    public async login(@Body() loginInfo:LoginDTO):Promise<LoginResponse>{
        try {
            return Promise.resolve(await this.authService.loginUser(loginInfo));
        } catch (error) {
            this.logger.error("This error occurred in auth controller. Method Name: login.", error);
            return Promise.reject(error);
        }
    }
    @Post("/refreshLogInToken")
    public async refreshLoginToken(@Headers() refreshToken){
        try{
            let token=refreshToken.x_refreshtoken;
            if (token && token.startsWith('Bearer ')) {
                token = token.replace('Bearer ', '').trim();
            }
            return Promise.resolve(await this.authService.refreshLoginToken(token));
        }catch(error){
            this.logger.error("This error occurred in auth controller. Method Name: refreshLoginToken.", error);
            return Promise.reject(error);
        }
    }
    
}
