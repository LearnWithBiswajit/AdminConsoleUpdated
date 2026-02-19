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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const login_dto_1 = require("./dto/login.dto");
const publicRoute_decorator_1 = require("../decorators/publicRoute.decorator");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    logger = new common_1.Logger();
    async login(loginInfo) {
        try {
            return Promise.resolve(await this.authService.loginUser(loginInfo));
        }
        catch (error) {
            this.logger.error("This error occurred in auth controller. Method Name: login.", error);
            return Promise.reject(error);
        }
    }
    async refreshLoginToken(refreshToken) {
        try {
            let token = refreshToken.x_refreshtoken;
            if (token && token.startsWith('Bearer ')) {
                token = token.replace('Bearer ', '').trim();
            }
            return Promise.resolve(await this.authService.refreshLoginToken(token));
        }
        catch (error) {
            this.logger.error("This error occurred in auth controller. Method Name: refreshLoginToken.", error);
            return Promise.reject(error);
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, publicRoute_decorator_1.Public)(),
    (0, common_1.Post)("/login"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDTO]),
    __metadata("design:returntype", typeof (_a = typeof Promise !== "undefined" && Promise) === "function" ? _a : Object)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)("/refreshLogInToken"),
    __param(0, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshLoginToken", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __param(0, (0, common_1.Inject)("IAuthService")),
    __metadata("design:paramtypes", [Object])
], AuthController);
//# sourceMappingURL=auth.controller.js.map