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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDevicesService = void 0;
const common_1 = require("@nestjs/common");
const userDevice_mapper_1 = require("./mapper/userDevice.mapper");
const crypto_1 = require("crypto");
let UserDevicesService = class UserDevicesService {
    usersDevicesRepository;
    deviceService;
    constructor(usersDevicesRepository, deviceService) {
        this.usersDevicesRepository = usersDevicesRepository;
        this.deviceService = deviceService;
    }
    logger = new common_1.Logger();
    async getInventory(page, limit, searchString) {
        try {
            let res = await this.usersDevicesRepository.getInventory(page, limit, searchString);
            let allDevies = res.map((item) => userDevice_mapper_1.UserDeviceMapper.mapToInventory(item));
            let { TotalCount } = await this.usersDevicesRepository.getInventoryCount(searchString);
            return Promise.resolve({ allDevies, totalCount: TotalCount });
        }
        catch (error) {
            this.logger.error("This error occurred in DeviceService. Method Name: getInventory", error);
            return Promise.reject(error);
        }
    }
    async assignDevice(body) {
        try {
            let toEntity = body.deviceIds.map((items) => userDevice_mapper_1.UserDeviceMapper.mapToEntity(body.userId, items));
            let res = await this.usersDevicesRepository.allocateDevice(toEntity);
            let updateDeviceStatus = this.deviceService.updateDeviceStatus({ deviceStatus: 1, id: (0, crypto_1.randomUUID)() }, body.deviceIds);
            let toDto = res.map((items) => userDevice_mapper_1.UserDeviceMapper.mapTodto(items));
            return Promise.resolve(toDto);
        }
        catch (error) {
            this.logger.error("This error occurred in UserDevicesService. Method Name: assignDevice", error);
            return Promise.reject(error);
        }
    }
    async deleteAssignedDevicesOfUser(userId) {
        try {
            let devices = await this.usersDevicesRepository.getDevicesByUserId(userId);
            let res = await this.usersDevicesRepository.assetsWithdrawal(userId);
            if (res > 0) {
                let status = await this.usersDevicesRepository.findAndUpdate(devices);
            }
            return Promise.resolve(res);
        }
        catch (error) {
            this.logger.error("This error occured in UserdevicesService. Method Nme: deleteAssigneddevicesOfUser", error);
            return Promise.reject(error);
        }
    }
    async releaseUserFromDevice(assetId) {
        try {
            let res = await this.usersDevicesRepository.deleteUserFromDevice(assetId);
            if (res.affectedRows > 0 && res.deletedRecord.deviceId) {
                let assignedUsers = await this.usersDevicesRepository.getUsersByDeviceId(res.deletedRecord.deviceId);
                if (assignedUsers.length === 0) {
                    this.deviceService.markAsDeadDevice(res.deletedRecord.deviceId);
                }
                return Promise.resolve({ message: "User Removed Successfully" });
            }
            throw new Error("Something Went Wrong");
        }
        catch (error) {
            this.logger.error("This error occurred in DeviceService. Method Name: releaseUserFromDevice", error);
            return Promise.reject(error);
        }
    }
    async getInfoOfDevicesAndUser(page, limit, searchString) {
        try {
            let res = await this.usersDevicesRepository.getInfoOfDevicesAndUser(page, limit, searchString);
            let allDevies = res.map((item) => userDevice_mapper_1.UserDeviceMapper.mapToBitLocker(item));
            let { TotalCount } = await this.usersDevicesRepository.getInfoOfDevicesAndUserCount(searchString);
            return Promise.resolve({ allDevies, totalCount: TotalCount });
        }
        catch (error) {
            this.logger.error("This error occurred in DeviceService. Method Name: getInventory", error);
            return Promise.reject(error);
        }
    }
};
exports.UserDevicesService = UserDevicesService;
exports.UserDevicesService = UserDevicesService = __decorate([
    __param(0, (0, common_1.Inject)("IUsersDevicesRepository")),
    __param(1, (0, common_1.Inject)("IDevicesService")),
    __metadata("design:paramtypes", [Object, Object])
], UserDevicesService);
//# sourceMappingURL=userAssignedToUser.service.js.map