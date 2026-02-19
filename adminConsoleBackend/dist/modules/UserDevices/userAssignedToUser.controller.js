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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersDevicesController = void 0;
const common_1 = require("@nestjs/common");
const userAssignedToDevice_dto_1 = require("./dto/userAssignedToDevice.dto");
const crypto_1 = require("crypto");
let UsersDevicesController = class UsersDevicesController {
    usersDevicesServices;
    constructor(usersDevicesServices) {
        this.usersDevicesServices = usersDevicesServices;
    }
    logger = new common_1.Logger();
    async getInventory(page, limit, searchString) {
        try {
            let res = await this.usersDevicesServices.getInventory(page, limit, searchString);
            return Promise.resolve(res);
        }
        catch (error) {
            this.logger.error("This error occurred in Device Controller. Method Name: getInventory", error);
            return Promise.reject(error);
        }
    }
    async assingDevice(body) {
        try {
            let res = await this.usersDevicesServices.assignDevice(body);
            return Promise.resolve(res.length);
        }
        catch (error) {
            this.logger.error("This error occurred in Device Controller. Method Name: assingDevice", error);
            return Promise.reject(error);
        }
    }
    async deleteAssignedDevicesOfUser(userId) {
        try {
            let res = await this.usersDevicesServices.deleteAssignedDevicesOfUser(userId);
            return Promise.resolve(res);
        }
        catch (error) {
            this.logger.error("This error occured in UsersDevicesController. Method Name: deleteAssignedDevicesOfUser", error);
            return Promise.reject(error);
        }
    }
    async releaseUser(assetId) {
        try {
            const res = await this.usersDevicesServices.releaseUserFromDevice(assetId);
            return Promise.resolve(res);
        }
        catch (error) {
            this.logger.error("This error occurred in DeviceController. Method Name: releaseUser", error);
            return Promise.reject(error);
        }
    }
    async getInfoOfDevicesAndUser(page, limit, searchString) {
        try {
            let res = await this.usersDevicesServices.getInfoOfDevicesAndUser(page, limit, searchString);
            return Promise.resolve(res);
        }
        catch (error) {
            this.logger.error("This error occurred in Device Controller. Method Name: getInventory", error);
            return Promise.reject(error);
        }
    }
};
exports.UsersDevicesController = UsersDevicesController;
__decorate([
    (0, common_1.Get)('/inventory'),
    __param(0, (0, common_1.Query)("page")),
    __param(1, (0, common_1.Query)("limit")),
    __param(2, (0, common_1.Query)("searchString")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", typeof (_a = typeof Promise !== "undefined" && Promise) === "function" ? _a : Object)
], UsersDevicesController.prototype, "getInventory", null);
__decorate([
    (0, common_1.Post)('/assignDevice'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [userAssignedToDevice_dto_1.UserToDevice]),
    __metadata("design:returntype", Promise)
], UsersDevicesController.prototype, "assingDevice", null);
__decorate([
    (0, common_1.Delete)('/deleteAsssets/:userId'),
    __param(0, (0, common_1.Param)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof crypto_1.UUID !== "undefined" && crypto_1.UUID) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], UsersDevicesController.prototype, "deleteAssignedDevicesOfUser", null);
__decorate([
    (0, common_1.Patch)('/removeUser/:assetId'),
    __param(0, (0, common_1.Param)('assetId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof crypto_1.UUID !== "undefined" && crypto_1.UUID) === "function" ? _c : Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], UsersDevicesController.prototype, "releaseUser", null);
__decorate([
    (0, common_1.Get)("/bitlockerInfo"),
    __param(0, (0, common_1.Query)("page")),
    __param(1, (0, common_1.Query)("limit")),
    __param(2, (0, common_1.Query)("searchString")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], UsersDevicesController.prototype, "getInfoOfDevicesAndUser", null);
exports.UsersDevicesController = UsersDevicesController = __decorate([
    (0, common_1.Controller)('UserDevice'),
    __param(0, (0, common_1.Inject)("IUserDevicesService")),
    __metadata("design:paramtypes", [Object])
], UsersDevicesController);
//# sourceMappingURL=userAssignedToUser.controller.js.map