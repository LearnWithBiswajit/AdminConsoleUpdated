import { LoginDTO } from "../dto/login.dto";
import { LoginResponse } from "../dto/loginResponse.dto";

export interface IAuthService{
    loginUser(loginInfo:LoginDTO):Promise<LoginResponse>;
    refreshLoginToken(refreshToken:string):Promise<any>
}