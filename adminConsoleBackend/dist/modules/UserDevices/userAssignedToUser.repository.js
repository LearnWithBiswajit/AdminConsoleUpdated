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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersDevicesRepository = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const device_entity_1 = require("../devices/entities/device.entity");
const user_entity_1 = require("../users/entities/user.entity");
const typeorm_2 = require("typeorm");
const user_devices_entity_1 = require("./entities/user_devices.entity");
const enum_config_1 = require("../../config/enum.config");
const common_1 = require("@nestjs/common");
let UsersDevicesRepository = class UsersDevicesRepository {
    deviceRepo;
    userRepo;
    assetRepo;
    constructor(deviceRepo, userRepo, assetRepo) {
        this.deviceRepo = deviceRepo;
        this.userRepo = userRepo;
        this.assetRepo = assetRepo;
    }
    logger = new common_1.Logger();
    async getInventory(page, limit, searchString) {
        try {
            let res;
            let query = this.assetRepo.createQueryBuilder("assets")
                .innerJoin('Users', 'users', "users.userId=assets.userId")
                .innerJoin('Device', 'devices', "devices.Id=assets.deviceId")
                .select("devices.Id", "id")
                .addSelect("users.firstName", "firstName")
                .addSelect("users.middleName", "middleName")
                .addSelect("users.LastName", "lastName")
                .addSelect("users.Email", "email")
                .addSelect("users.Role", "role")
                .addSelect("devices.Status", "deviceStatus")
                .addSelect("devices.DeviceType", "deviceType")
                .addSelect("devices.MACAddress", "macAddress")
                .addSelect("devices.HostName", "hostName")
                .addSelect("devices.OSType", "osType")
                .addSelect("devices.SerialNumber", "serialNumber")
                .addSelect("devices.Brand", "brand")
                .addSelect("assets.ID", "assetId")
                .where('devices.Status=:status', { status: enum_config_1.DeviceStatus.Active })
                .andWhere('devices.IsDeleted =:isDeleted', { isDeleted: false });
            if (searchString) {
                query = query.andWhere(new typeorm_2.Brackets((qb) => {
                    qb.andWhere("users.FirstName LIKE :searchString", { searchString: `%${searchString}%` })
                        .orWhere("users.MiddleName LIKE :searchString", { searchString: `%${searchString}%` })
                        .orWhere("users.LastName LIKE :searchString", { searchString: `%${searchString}%` })
                        .orWhere("users.Email LIKE :searchString", { searchString: `%${searchString}%` })
                        .orWhere("devices.SerialNumber LIKE :searchString", { searchString: `%${searchString}%` })
                        .orWhere("devices.HostName LIKE :searchString", { searchString: `%${searchString}%` });
                }));
            }
            res = await query.offset(Number((page - 1) * limit))
                .limit(limit)
                .getRawMany();
            return Promise.resolve(res);
        }
        catch (error) {
            this.logger.error("This error occurred in Device Repository. Method Name: getInventory", error);
            return Promise.reject(error);
        }
    }
    async getInventoryCount(searchString) {
        try {
            let query = this.assetRepo.createQueryBuilder("assets")
                .innerJoin('Users', 'users', "users.userId=assets.userId")
                .innerJoin('Device', 'devices', "devices.Id=assets.deviceId")
                .where('devices.Status=:status', { status: enum_config_1.DeviceStatus.Active })
                .andWhere('devices.IsDeleted = :isDeleted', { isDeleted: false });
            if (searchString) {
                query = query.andWhere(new typeorm_2.Brackets((qb) => {
                    qb.andWhere("users.FirstName LIKE:searchString", { searchString: `%${searchString}%` })
                        .orWhere("users.MiddleName LIKE:searchString", { searchString: `%${searchString}%` })
                        .orWhere("users.LastName LIKE:searchString", { searchString: `%${searchString}%` })
                        .orWhere("users.Email LIKE:searchString", { searchString: `%${searchString}%` })
                        .orWhere("devices.SerialNumber LIKE:searchString", { searchString: `%${searchString}%` })
                        .orWhere("devices.HostName LIKE :searchString", { searchString: `%${searchString}%` });
                }));
            }
            let res = await query.getCount();
            console.log(res);
            return { TotalCount: res };
        }
        catch (error) {
            this.logger.error("This error occurred in Device Repository. Method Name: getInventory", error);
            return Promise.reject(error);
        }
    }
    async allocateDevice(body) {
        try {
            let res = await this.assetRepo.save(body);
            return Promise.resolve(res);
        }
        catch (error) {
            this.logger.error("This error occurred in User Device Repository. Method Name: allocateDevice", error);
            return Promise.reject(error);
        }
    }
    async getDevicesByUserId(userId) {
        try {
            let res = await this.assetRepo.find({ where: { userId: userId }, select: ["deviceId"] });
            let devicelist = [];
            let list = devicelist.concat(res.map((item) => item.deviceId));
            return Promise.resolve(list);
        }
        catch (error) {
            this.logger.error("This error occured in UsersDevicesRepository. Method Name: getDevicesByUserId", error);
            return Promise.reject(error);
        }
    }
    async assetsWithdrawal(userId) {
        try {
            let res = await this.assetRepo.delete({ userId: userId });
            return Promise.resolve(res.affected);
        }
        catch (error) {
            this.logger.error("This error occured in UserDevicesRepository. Method Name: assetsWithdrawal", error);
            return Promise.reject(error);
        }
    }
    async findAndUpdate(device) {
        try {
            let allocatedDevices = await this.assetRepo.createQueryBuilder("UA")
                .select("UA.DeviceID")
                .where("UA.DeviceID IN (:deviceIds)", { deviceIds: device })
                .groupBy("UA.DeviceID")
                .getRawMany();
            allocatedDevices = allocatedDevices.map(item => item.DeviceID);
            let deviceSet = new Set(allocatedDevices);
            let unAllocatedDevices = device.filter(item => { if (!deviceSet.has(item))
                return item; });
            let status = this.deviceRepo.update({ id: (0, typeorm_2.In)(unAllocatedDevices) }, { deviceStatus: enum_config_1.DeviceStatus.Dead });
            return Promise.resolve(status);
        }
        catch (error) {
            this.logger.error("This error occured in UserDevicesRepository. Method Name: findAndUpdate", error);
            return Promise.reject(error);
        }
    }
    async deleteUserFromDevice(assetId) {
        try {
            let record = await this.assetRepo.findOne({ where: { assetId: assetId } });
            let res = await this.assetRepo.delete({ assetId: assetId });
            return Promise.resolve({ deletedRecord: record, affectedRows: Number(res.affected) });
        }
        catch (error) {
            this.logger.error("This error occured in UserDevicesRepository. Method Name: deleteUserFromDevice", error);
            return Promise.reject(error);
        }
    }
    async getUsersByDeviceId(deviceId) {
        try {
            let res = await this.assetRepo.find({ where: { deviceId: deviceId } });
            return Promise.resolve(res);
        }
        catch (error) {
            this.logger.error("This error occured in UserDevicesRepository. Method Name: getUsersByDeviceId", error);
            return Promise.reject(error);
        }
    }
    async getInfoOfDevicesAndUser(page, limit, searchString) {
        try {
            let res;
            let query = this.deviceRepo
                .createQueryBuilder('devices')
                .leftJoin('UsersAssets', 'UsersAssets', 'devices.Id = UsersAssets.deviceId')
                .leftJoin('Users', 'users', 'users.UserID = UsersAssets.userId')
                .select("devices.Id", "id")
                .addSelect("users.firstName", "firstName")
                .addSelect("users.UserID", "userId")
                .addSelect("users.middleName", "middleName")
                .addSelect("users.LastName", "lastName")
                .addSelect("users.Email", "email")
                .addSelect("users.Role", "role")
                .addSelect("devices.Status", "deviceStatus")
                .addSelect("devices.DeviceType", "deviceType")
                .addSelect("devices.MACAddress", "macAddress")
                .addSelect("devices.HostName", "hostName")
                .addSelect("devices.OSType", "osType")
                .addSelect("devices.SerialNumber", "serialNumber")
                .addSelect("devices.Brand", "brand")
                .addSelect("devices.BitLockerID", "bitlockerId")
                .addSelect("devices.RecoveryKey", "recoveryKey")
                .where('devices.isDeleted = :isDeleted', { isDeleted: false });
            if (searchString) {
                query = query.andWhere(new typeorm_2.Brackets((qb) => {
                    qb.andWhere("devices.SerialNumber LIKE :searchString", { searchString: `%${searchString}%` })
                        .orWhere("devices.HostName LIKE :searchString", { searchString: `%${searchString}%` })
                        .orWhere("devices.RecoveryKey LIKE :searchString", { searchString: `%${searchString}%` })
                        .orWhere("devices.BitLockerID LIKE :searchString", { searchString: `%${searchString}%` });
                }));
            }
            res = await query.offset(Number((page - 1) * limit))
                .limit(limit)
                .getRawMany();
            return Promise.resolve(res);
        }
        catch (error) {
            this.logger.error("This error occurred in UserAssignedToDevice Repository. Method Name: getInfoOfDevicesAndUser", error);
            return Promise.reject(error);
        }
    }
    async getInfoOfDevicesAndUserCount(searchString) {
        try {
            let query = this.deviceRepo.createQueryBuilder('devices')
                .leftJoin('UsersAssets', 'UsersAssets', 'devices.Id = UsersAssets.deviceId')
                .leftJoin('Users', 'users', 'users.UserID = UsersAssets.userId')
                .where('devices.isDeleted = :isDeleted', { isDeleted: false });
            if (searchString) {
                query = query.andWhere(new typeorm_2.Brackets((qb) => {
                    qb.andWhere("devices.SerialNumber LIKE :searchString", { searchString: `%${searchString}%` })
                        .orWhere("devices.HostName LIKE :searchString", { searchString: `%${searchString}%` })
                        .orWhere("devices.RecoveryKey LIKE :searchString", { searchString: `%${searchString}%` })
                        .orWhere("devices.bitLockerId LIKE :searchString", { searchString: `%${searchString}%` });
                }));
            }
            let res = await query.getCount();
            console.log(res);
            return { TotalCount: res };
        }
        catch (error) {
            this.logger.error("This error occurred in UserDevice Repository. Method Name: getInfoOfDevicesAndUserCount", error);
            return Promise.reject(error);
        }
    }
};
exports.UsersDevicesRepository = UsersDevicesRepository;
exports.UsersDevicesRepository = UsersDevicesRepository = __decorate([
    __param(0, (0, typeorm_1.InjectRepository)(device_entity_1.Device)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(user_devices_entity_1.UsersAssets)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object])
], UsersDevicesRepository);
//# sourceMappingURL=userAssignedToUser.repository.js.map