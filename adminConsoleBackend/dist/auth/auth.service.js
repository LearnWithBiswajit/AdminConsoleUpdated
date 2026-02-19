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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const loginResponse_dto_1 = require("./dto/loginResponse.dto");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const enum_config_1 = require("../config/enum.config");
let AuthService = class AuthService {
    userRepository;
    jwtService;
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    logger = new common_1.Logger();
    async loginUser(loginInfo) {
        try {
            const user = await this.userRepository.getUserByEmail(loginInfo.email);
            if (!user || (user.role !== enum_config_1.UserRole.Admin && user.role !== enum_config_1.UserRole.SuperAdmin)) {
                throw new common_1.UnauthorizedException("Invalid Email or Password");
            }
            let verifyComplete = await bcrypt.compare(loginInfo.password, user.password);
            if (!verifyComplete) {
                throw new common_1.UnauthorizedException("Invalid Email or Password");
            }
            const accessToken = await this.jwtService.signAsync({ email: user.email });
            const loginResponse = new loginResponse_dto_1.LoginResponse;
            loginResponse.accessToken = accessToken;
            loginResponse.refreshToken = await this.createRefreshToken(accessToken);
            return Promise.resolve(loginResponse);
        }
        catch (error) {
            this.logger.error(error);
            throw new common_1.ForbiddenException("Invalid Email or Password");
        }
    }
    async createRefreshToken(accessToken) {
        const refreshToken = this.jwtService.sign({ accessToken: accessToken }, { expiresIn: '2m' });
        return refreshToken;
    }
    async refreshLoginToken(refreshToken) {
        try {
            const decoded = this.jwtService.decode(refreshToken);
            console.log(decoded);
            let decodedAccessToken = this.jwtService.decode(decoded.accessToken);
            const user = await this.userRepository.getUserByEmail(decodedAccessToken.email);
            if (!user || (user.role !== enum_config_1.UserRole.Admin && user.role !== enum_config_1.UserRole.SuperAdmin)) {
                throw new common_1.UnauthorizedException('Invalid refresh token');
            }
            const newAccessToken = await this.jwtService.signAsync({ email: decodedAccessToken.email });
            const newRefreshToken = await this.jwtService.signAsync({ accessToken: newAccessToken }, { expiresIn: '7d' });
            const loginResponse = new loginResponse_dto_1.LoginResponse;
            loginResponse.accessToken = newAccessToken;
            loginResponse.refreshToken = newRefreshToken;
            return { loginResponse };
        }
        catch (error) {
            this.logger.error(error);
            throw new common_1.UnauthorizedException("Invalid or expired refresh token");
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("IUserRepository")),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object])
], AuthService);
//# sourceMappingURL=auth.service.js.map