"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuardsGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const enum_config_1 = require("../config/enum.config");
const publicRoute_decorator_1 = require("../decorators/publicRoute.decorator");
let GuardsGuard = class GuardsGuard {
    reflector;
    userRepository;
    constructor(reflector, userRepository) {
        this.reflector = reflector;
        this.userRepository = userRepository;
    }
    logger = new common_1.Logger();
    async canActivate(context) {
        let isPublic = this.reflector.getAllAndOverride(publicRoute_decorator_1.IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass()
        ]);
        if (isPublic)
            return true;
        try {
            let jwtService = new jwt_1.JwtService();
            const http = context.switchToHttp();
            console.log('GetRequest:', http.getRequest().url);
            let request = http.getRequest();
            if (!request.headers.authorization) {
                this.logger.error("Candidate token not present or Token is not generated");
                throw new common_1.HttpException({
                    statusCode: common_1.HttpStatus.UNAUTHORIZED,
                    message: 'Auth Token Not Provided',
                    error: 'Unauthorized Access'
                }, common_1.HttpStatus.UNAUTHORIZED);
            }
            let auth = request.headers.authorization;
            auth = (auth && auth.startsWith('Bearer ')) ? (auth.replace('Bearer ', '').trim()) : auth;
            if (http.getRequest().url == "/api/auth/refreshLogInToken") {
                const decoded = jwtService.decode(auth);
                if (!decoded) {
                    throw new common_1.HttpException("Please provide valid JWT Token", common_1.HttpStatus.FORBIDDEN);
                }
                let user = await this.fineone(decoded.email);
                if (user) {
                    let currentTime = new Date();
                    let timestampInMillis = currentTime.getTime();
                    let unixTimestamp = Math.floor(timestampInMillis / 1000);
                    if (unixTimestamp > decoded.exp) {
                        let authRefreshToken = request.headers.x_refreshtoken;
                        authRefreshToken = (authRefreshToken && authRefreshToken.startsWith('Bearer ')) ? (authRefreshToken.replace('Bearer ', '').trim()) : authRefreshToken;
                        let decodeRefreshToken = jwtService.decode(authRefreshToken);
                        if (decodeRefreshToken.exp > unixTimestamp) {
                            return true;
                        }
                        else {
                            throw new common_1.HttpException({
                                statusCode: common_1.HttpStatus.FORBIDDEN,
                                message: 'The token has expired need to login again.',
                                error: 'Token Expiered'
                            }, common_1.HttpStatus.FORBIDDEN);
                        }
                    }
                    else {
                        throw new common_1.HttpException({
                            statusCode: common_1.HttpStatus.BAD_REQUEST,
                            message: 'The token is not expired.',
                            error: 'Token not Expiered'
                        }, common_1.HttpStatus.BAD_REQUEST);
                    }
                }
                else {
                    throw new common_1.HttpException({
                        statusCode: common_1.HttpStatus.FORBIDDEN,
                        message: 'The Login Email ID does not exist.',
                        error: 'Email ID does not exist.'
                    }, common_1.HttpStatus.FORBIDDEN);
                }
            }
            let user = await this.fineone(jwtService.decode(auth).email, request);
            let admin = await this.verifyUser(auth);
            return admin;
        }
        catch (error) {
            console.log("Error occurred in Authguard", error);
            return Promise.reject(error);
        }
    }
    async verifyUser(token) {
        try {
            let jwtService = new jwt_1.JwtService();
            let user = jwtService.verify(token, { secret: "jwt_secret" });
            let userDetails = await this.userRepository.getUserByEmail(user.email);
            if (!userDetails || (userDetails.role !== enum_config_1.UserRole.Admin && userDetails.role !== enum_config_1.UserRole.SuperAdmin)) {
                this.logger.error("Invalid or Candidate not assigned in admin role");
                throw new Error("Invalid or Candidate not assigned in admin role");
            }
            return Promise.resolve(true);
        }
        catch (error) {
            this.logger.error(error);
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.UNAUTHORIZED,
                message: 'Cant verify the token.',
                error: 'Unauthorized Access'
            }, common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    async fineone(email, requestObj) {
        let userDetails = await this.userRepository.getUserByEmail(email);
        console.log(userDetails);
        if (!userDetails) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.FORBIDDEN,
                message: 'The Login Email ID does not exist.',
                error: 'Email ID does not exist.'
            }, common_1.HttpStatus.FORBIDDEN);
        }
        else if (userDetails.role !== enum_config_1.UserRole.Admin && userDetails.role !== enum_config_1.UserRole.SuperAdmin) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.FORBIDDEN,
                message: 'Missing custom authentication header.',
                error: 'Unauthorized Access'
            }, common_1.HttpStatus.FORBIDDEN);
        }
        else {
            if (requestObj) {
                requestObj["context"] = userDetails;
            }
            return true;
        }
    }
};
exports.GuardsGuard = GuardsGuard;
exports.GuardsGuard = GuardsGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)("IUserRepository")),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object, Object])
], GuardsGuard);
//# sourceMappingURL=guards.guard.js.map