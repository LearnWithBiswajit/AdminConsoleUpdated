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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const device_entity_1 = require("./entities/device.entity");
const typeorm_2 = require("typeorm");
const enum_config_1 = require("../../config/enum.config");
const deviceHistory_entity_1 = require("./entities/deviceHistory.entity");
let DeviceRepository = class DeviceRepository {
    deviceRepo;
    deviceHistoryRepo;
    constructor(deviceRepo, deviceHistoryRepo) {
        this.deviceRepo = deviceRepo;
        this.deviceHistoryRepo = deviceHistoryRepo;
    }
    logger = new common_1.Logger();
    async findAllDevices(query) {
        try {
            let res = await this.deviceRepo.find({ where: [{ deviceStatus: query.deviceStatus, deviceType: query.deviceType, osType: query.osType, isDeleted: false, serialNumber: (0, typeorm_2.Like)(query.searchString ? `%${query.searchString}%` : `%%`) }, { deviceStatus: query.deviceStatus, deviceType: query.deviceType, osType: query.osType, isDeleted: false, hostName: (0, typeorm_2.Like)(query.searchString ? `%${query.searchString}%` : `%%`) }], skip: Number((query.page - 1) * query.limit), take: query.limit });
            return Promise.resolve(res);
        }
        catch (error) {
            this.logger.error("This error occurred in Device Repository. Method Name: findAllDevices", error);
            return Promise.reject(error);
        }
    }
    async insertDevice(deviceEntity) {
        try {
            let res = await this.deviceRepo.save(deviceEntity);
            return Promise.resolve(res);
        }
        catch (error) {
            this.logger.error("This error occurred in Device Repository. Method Name: insertDevice", error);
            return Promise.reject(error);
        }
    }
    async updateDeviceStatus(updateDeviceEntity, deviceIds) {
        try {
            let updateIds = deviceIds ? deviceIds : updateDeviceEntity?.id ? Array.of(updateDeviceEntity.id) : null;
            let res = await this.deviceRepo.update({ id: (0, typeorm_2.In)(updateIds) }, { deviceStatus: updateDeviceEntity.deviceStatus });
            if (res.affected && res.affected > 0) {
                return Promise.resolve(res.affected);
            }
            else {
                return Promise.resolve(0);
            }
        }
        catch (error) {
            this.logger.error("This error occurred in Device Repository. Method Name: updateDeviceStatus", error);
            return Promise.reject(error);
        }
    }
    async findTotalCountByStatusAndDeviceType(deviceStatus, deviceType, osType, flag, searchString) {
        try {
            let res;
            if (!osType && !flag) {
                let query = this.deviceRepo.createQueryBuilder('D')
                    .select("D.DeviceType", "deviceType")
                    .addSelect("D.OSType", "osType")
                    .addSelect("COUNT(1)", "count")
                    .where("D.Status = :deviceStatus", { deviceStatus: deviceStatus })
                    .andWhere("D.IsDeleted = :isDeleted", { isDeleted: false })
                    .groupBy("D.OSType, D.DeviceType");
                if (deviceType) {
                    query.andWhere("D.DeviceType = :deviceType", { deviceType: deviceType });
                }
                this.logger.log(`Execution started for fetching total count with device type ${deviceType}`);
                let res = query.getRawMany();
                this.logger.log(`Execution completed for fetching total count with device type ${deviceType}`);
                console.log(res);
                return Promise.resolve(res);
            }
            this.logger.log(`Executing fetching total count without device type`);
            return await this.deviceRepo.count({ where: [{ deviceStatus: deviceStatus, deviceType: deviceType, osType: osType, isDeleted: false, serialNumber: (0, typeorm_2.Like)(searchString ? `%${searchString}%` : `%%`) }, { deviceStatus: deviceStatus, deviceType: deviceType, osType: osType, isDeleted: false, hostName: (0, typeorm_2.Like)(searchString ? `%${searchString}%` : `%%`) }] });
        }
        catch (error) {
            this.logger.error("This error occurred in Device Repository. Method Name: findTotalCountByStatusAndDeviceType", error);
            return Promise.reject(error);
        }
    }
    async insertDeviceHistory(deviceInfo) {
        try {
            let res = await this.deviceHistoryRepo.insert(deviceInfo);
            console.log(res);
            return Promise.resolve(res);
        }
        catch (error) {
            this.logger.error("This error occurred in Device Repository. Method Name: insertDeviceHistory", error);
            return Promise.reject(error);
        }
    }
    async getInventory(page, limit, searchString) {
        try {
            let res;
            let query = this.deviceRepo.createQueryBuilder("devices")
                .innerJoin('Users', 'users', "users.userId=devices.userId")
                .select("devices.Id", "id")
                .addSelect("users.firstName", "firstName")
                .addSelect("users.middleName", "middleName")
                .addSelect("users.LastName", "lastName")
                .addSelect("users.Email", "email")
                .addSelect("devices.Status", "deviceStatus")
                .addSelect("devices.DeviceType", "deviceType")
                .addSelect("devices.MACAddress", "macAddress")
                .addSelect("devices.HostName", "hostName")
                .addSelect("devices.OSType", "osType")
                .addSelect("devices.SerialNumber", "serialNumber")
                .addSelect("devices.Brand", "brand")
                .where('devices.Status=:status', { status: enum_config_1.DeviceStatus.Active })
                .andWhere("devices.IsDeleted=:isDeleted", { isDeleted: false });
            if (searchString) {
                query = query.andWhere(new typeorm_2.Brackets((qb) => {
                    qb.where("users.firstName LIKE :searchString", { searchString: `%${searchString}%` })
                        .orWhere("users.middlename LIKE :searchString", { searchString: `%${searchString}%` })
                        .orWhere("users.lastName LIKE :searchString", { searchString: `%${searchString}%` })
                        .orWhere("users.Email LIKE :searchString", { searchString: `%${searchString}%` })
                        .orWhere("devices.SerialNumber LIKE :searchString", { searchString: `%${searchString}%` });
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
            let query = await this.deviceRepo.createQueryBuilder("devices")
                .innerJoin('Users', 'users', "users.userId=devices.userId")
                .where('devices.Status=:status', { status: enum_config_1.DeviceStatus.Active })
                .andWhere("devices.IsDeleted=:isDeleted", { isDeleted: false });
            if (searchString) {
                query = await query.andWhere("users.FirstName LIKE:searchString", { searchString: `%${searchString}%` })
                    .orWhere("users.MiddleName LIKE:searchString", { searchString: `%${searchString}%` })
                    .orWhere("users.LastName LIKE:searchString", { searchString: `%${searchString}%` })
                    .orWhere("users.Email LIKE:searchString", { searchString: `%${searchString}%` })
                    .orWhere("devices.SerialNumber LIKE:searchString", { searchString: `%${searchString}%` });
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
    async deleteDevice(deviceId) {
        try {
            let res = await this.deviceRepo.update({ id: deviceId }, { isDeleted: true });
            console.log(res);
            return Promise.resolve(res.affected ? res.affected : 0);
        }
        catch (error) {
            this.logger.error("This error occurred in Device Repository. Meethod Name: deleteDevice", error);
            return Promise.reject(error);
        }
    }
    async getDeviceById(id) {
        try {
            let res = await this.deviceRepo.findOne({ where: { id: id } });
            if (!res) {
                throw new Error('No such device found');
            }
            return Promise.resolve(res);
        }
        catch (error) {
            this.logger.error("This error occurred in Device Repository. Method Name: getDeviceById", error);
            return Promise.reject(error);
        }
    }
    async updateDevice(body) {
        try {
            let res = this.deviceRepo.save(body);
            return Promise.resolve(res);
        }
        catch (error) {
            this.logger.error("This error occured in DeviceRepository. Method Name: UpdateDevice", error);
            return Promise.reject(error);
        }
    }
    async markAsDeadDevice(deviceId) {
        try {
            let res = await this.deviceRepo.update({ id: deviceId }, { deviceStatus: enum_config_1.DeviceStatus.Dead });
            return Promise.resolve(Number(res.affected));
        }
        catch (error) {
            this.logger.error("This error occured in DeviceRepository. Method Name: markAsDeadDevice", error);
            return Promise.reject(error);
        }
    }
    async addBitlockerKey(info) {
        try {
            let res = await this.deviceRepo.update({ id: info.id }, { bitlockerId: info.bitlockerId, recoveryKey: info.recoveryKey });
            return Promise.resolve(Number(res.affected));
        }
        catch (error) {
            this.logger.error("This error occured in DeviceRepository. Method Name: addBitlockerKey", error);
            return Promise.reject(error);
        }
    }
};
exports.DeviceRepository = DeviceRepository;
exports.DeviceRepository = DeviceRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(device_entity_1.Device)),
    __param(1, (0, typeorm_1.InjectRepository)(deviceHistory_entity_1.DeviceUsageHistory)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object])
], DeviceRepository);
//# sourceMappingURL=devices.repository.js.map