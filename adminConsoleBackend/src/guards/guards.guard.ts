import { CanActivate, ExecutionContext, HttpException, HttpStatus, Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { UserRole } from 'src/config/enum.config';
import { IS_PUBLIC_KEY } from 'src/decorators/publicRoute.decorator';
import { User } from 'src/modules/users/entities/user.entity';
import { IUserRepository } from 'src/modules/users/interfaces/users.interface';
@Injectable()
export class GuardsGuard implements CanActivate {
  constructor(private reflector: Reflector, @Inject("IUserRepository") private readonly userRepository: IUserRepository) {
  }
  // @Inject("IUserRepository")private readonly userRepository:IUserRepository
  logger: Logger = new Logger();
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    let isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    if (isPublic) return true;

    try {
      let jwtService: JwtService = new JwtService();

      const http = context.switchToHttp();
      console.log('GetRequest:', http.getRequest().url);
      let request = http.getRequest();

      // console.log("accessToken",request.headers.authorization);
      // console.log("refreshToken", request.headers.x_refreshtoken);

      //accessToken Not Present.
      if (!request.headers.authorization) {
        this.logger.error("Candidate token not present or Token is not generated");
        throw new HttpException({
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Auth Token Not Provided',
          error: 'Unauthorized Access'
        }, HttpStatus.UNAUTHORIZED);
      }

      //Seperating the extra part from the accessToken.
      let auth = request.headers.authorization;
      auth = (auth && auth.startsWith('Bearer ')) ? (auth.replace('Bearer ', '').trim()) : auth

      //If the User requests for Refresh Token
      if (http.getRequest().url == "/api/auth/refreshLogInToken") {

        //Decoding the accessToken {email:email, iat:Date, eat:Date}.
        const decoded = jwtService.decode(auth);
        if (!decoded) {
          throw new HttpException("Please provide valid JWT Token", HttpStatus.FORBIDDEN);
        }
        // console.log(decoded);

        //Finding If such user exist or not
        let user = await this.fineone(decoded.email);
        // console.log(user);
        if (user) {
          let currentTime = new Date()
          let timestampInMillis: number = currentTime.getTime();
          let unixTimestamp: number = Math.floor(timestampInMillis / 1000);

          // console.log(unixTimestamp)
          // Comparing if the AccessToken is expired or not
          if (unixTimestamp > decoded.exp) {
            let authRefreshToken = request.headers.x_refreshtoken;
            authRefreshToken = (authRefreshToken && authRefreshToken.startsWith('Bearer ')) ? (authRefreshToken.replace('Bearer ', '').trim()) : authRefreshToken;
            let decodeRefreshToken = jwtService.decode(authRefreshToken);
            //Comparing if the Refresh Token is also expired or not if exxpired the user needs to login
            if (decodeRefreshToken.exp > unixTimestamp) {
              return true
            } else {
              throw new HttpException({
                statusCode: HttpStatus.FORBIDDEN,
                message: 'The token has expired need to login again.',
                error: 'Token Expiered'
              }, HttpStatus.FORBIDDEN);
            }
          }
          else {
            throw new HttpException({
              statusCode: HttpStatus.BAD_REQUEST,
              message: 'The token is not expired.',
              error: 'Token not Expiered'
            }, HttpStatus.BAD_REQUEST);
          }
        } else {
          throw new HttpException({
            statusCode: HttpStatus.FORBIDDEN,
            message: 'The Login Email ID does not exist.',
            error: 'Email ID does not exist.'
          }, HttpStatus.FORBIDDEN);
        }
      }

      let user = await this.fineone(jwtService.decode(auth).email, request);
      // request.context = user;
      let admin: boolean = await this.verifyUser(auth);
      return admin;
    } catch (error) {
      console.log("Error occurred in Authguard", error);
      return Promise.reject(error);
    }
  }

  async verifyUser(token: string): Promise<boolean> {
    try {
      let jwtService: JwtService = new JwtService();
      let user = jwtService.verify(token, { secret: "jwt_secret" });
      let userDetails: User | null = await this.userRepository.getUserByEmail(user.email);
      if (!userDetails || (userDetails.role !== UserRole.Admin && userDetails.role !== UserRole.SuperAdmin)) {
        this.logger.error("Invalid or Candidate not assigned in admin role");
        throw new Error("Invalid or Candidate not assigned in admin role")
      }
      // console.log(userDetails);


      return Promise.resolve(true);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Cant verify the token.',
        error: 'Unauthorized Access'
      }, HttpStatus.UNAUTHORIZED);
      // return new UnauthorizedException("Invalid or Candidate token expiered")
    }

  }

  async fineone(email: string, requestObj?:any):Promise<boolean> {
    let userDetails: User | null = await this.userRepository.getUserByEmail(email);
    console.log(userDetails);

    if (!userDetails) {
      throw new HttpException({
        statusCode: HttpStatus.FORBIDDEN,
        message: 'The Login Email ID does not exist.',
        error: 'Email ID does not exist.'
      }, HttpStatus.FORBIDDEN);
    } else if (userDetails.role !== UserRole.Admin && userDetails.role !== UserRole.SuperAdmin) {
      throw new HttpException({
        statusCode: HttpStatus.FORBIDDEN,
        message: 'Missing custom authentication header.',
        error: 'Unauthorized Access'
      }, HttpStatus.FORBIDDEN);
    } else {
      if(requestObj){
        requestObj["context"] = userDetails;
      }
      return true;
    }
  }
}
