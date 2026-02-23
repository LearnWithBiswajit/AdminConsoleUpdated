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
exports.DeviceRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const device_entity_1 = require("./entities/device.entity");
const typeorm_2 = require("typeorm");
const enum_config_1 = require("../../config/enum.config");
const deviceHistory_entity_1 = require("./entities/deviceHistory.entity");
const osInfo_entity_1 = require("../osInfo/entities/osInfo.entity");
let DeviceRepository = class DeviceRepository {
    deviceRepo;
    deviceHistoryRepo;
    osInfoRepo;
    constructor(deviceRepo, deviceHistoryRepo, osInfoRepo) {
        this.deviceRepo = deviceRepo;
        this.deviceHistoryRepo = deviceHistoryRepo;
        this.osInfoRepo = osInfoRepo;
    }
    logger = new common_1.Logger();
    async findAllDevices(query) {
        try {
            let dbQuery = this.deviceRepo
                .createQueryBuilder("D")
                .innerJoin("OSInfo", "OI", "D.OSId = OI.OSId")
                .select("D.Id", "id")
                .addSelect("D.DeviceType", "deviceType")
                .addSelect("D.Status", "deviceStatus")
                .addSelect("D.HostName", "hostName")
                .addSelect("D.SerialNumber", "serialNumber")
                .addSelect("D.Brand", "brand")
                .addSelect("D.MACAddress", "macAddress")
                .addSelect("D.BitlockerID", "bitlockerId")
                .addSelect("D.recoveryKey", "recoveryKey")
                .addSelect("OI.OSType", "osType")
                .addSelect("OI.OSName", "osName")
                .addSelect("OI.OSVersion", "osVersion")
                .where("D.IsDeleted =:isDeleted", { isDeleted: false });
            if (query.deviceStatus) {
                dbQuery.andWhere("COALESCE(D.Status) =:status", { status: query.deviceStatus });
            }
            if (query.deviceType) {
                dbQuery.andWhere("D.DeviceType =:deviceType", { deviceType: query.deviceType });
            }
            if (query.osType) {
                dbQuery.andWhere("OI.OSType =:osType", { osType: query.osType });
            }
            if (query.searchString) {
                dbQuery = dbQuery.andWhere(new typeorm_2.Brackets((qb) => {
                    qb.where("D.SerialNumber LIKE :searchString", {
                        searchString: query.searchString,
                    }).orWhere("D.HostName LIKE :searchString", {
                        searchString: query.searchString,
                    });
                }));
            }
            let res = await dbQuery
                .limit(query.limit)
                .offset(Number(query.page - 1) * query.limit)
                .getRawMany();
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
            let updateIds = deviceIds
                ? deviceIds
                : updateDeviceEntity?.id
                    ? Array.of(updateDeviceEntity.id)
                    : null;
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
                let query = this.deviceRepo
                    .createQueryBuilder("D")
                    .innerJoin("OSInfo", "OI", "D.OSId = OI.OSId")
                    .select("D.DeviceType", "deviceType")
                    .addSelect("OI.OSType", "osType")
                    .addSelect("COUNT(1)", "count")
                    .where("D.Status = :deviceStatus", { deviceStatus: deviceStatus })
                    .andWhere("D.IsDeleted = :isDeleted", { isDeleted: false })
                    .groupBy("OI.OSType, D.DeviceType");
                if (deviceType) {
                    query.andWhere("D.DeviceType = :deviceType", {
                        deviceType: deviceType,
                    });
                }
                this.logger.log(`Execution started for fetching total count with device type ${deviceType}`);
                let res = query.getRawMany();
                this.logger.log(`Execution completed for fetching total count with device type ${deviceType}`);
                console.log(res);
                return Promise.resolve(res);
            }
            this.logger.log(`Executing fetching total count without device type`);
            let dbQuery = this.deviceRepo
                .createQueryBuilder("D")
                .innerJoin("OSInfo", "OI", "D.OSId = OI.OSId")
                .where("D.Status =:status", { status: deviceStatus })
                .andWhere("D.DeviceType =:deviceType", { deviceType: deviceType })
                .andWhere("OI.OSType =:osType", { osType: osType })
                .andWhere("D.IsDeleted =:isDeleted", { isDeleted: false });
            if (searchString) {
                dbQuery = dbQuery.andWhere(new typeorm_2.Brackets((qb) => {
                    qb.where("D.SerialNumber LIKE :searchString", {
                        searchString: searchString,
                    }).orWhere("D.HostName LIKE :searchString", {
                        searchString: searchString,
                    });
                }));
            }
            return await dbQuery.getCount();
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
            let res = [];
            return Promise.resolve(res);
        }
        catch (error) {
            this.logger.error("This error occurred in Device Repository. Method Name: getInventory", error);
            return Promise.reject(error);
        }
    }
    async getInventoryCount(searchString) {
        try {
            let query = await this.deviceRepo
                .createQueryBuilder("devices")
                .innerJoin("Users", "users", "users.userId=devices.userId")
                .where("devices.Status=:status", { status: enum_config_1.DeviceStatus.Active })
                .andWhere("devices.IsDeleted=:isDeleted", { isDeleted: false });
            if (searchString) {
                query = await query
                    .andWhere("users.FirstName LIKE:searchString", {
                    searchString: `%${searchString}%`,
                })
                    .orWhere("users.MiddleName LIKE:searchString", {
                    searchString: `%${searchString}%`,
                })
                    .orWhere("users.LastName LIKE:searchString", {
                    searchString: `%${searchString}%`,
                })
                    .orWhere("users.Email LIKE:searchString", {
                    searchString: `%${searchString}%`,
                })
                    .orWhere("devices.SerialNumber LIKE:searchString", {
                    searchString: `%${searchString}%`,
                });
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
                throw new Error("No such device found");
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
    async getDeviceInfoByHostOrSerial(serialNumber, hostName) {
        try {
            this.logger.log(`Execution Started for getting device by SerialNumber:${serialNumber}, HostName:${hostName}`);
            let res = await this.deviceRepo.findOne({ where: [{ serialNumber: serialNumber, isDeleted: false }, { hostName: hostName, isDeleted: false }] });
            this.logger.log(`Execution Completed for getting device by SerialNumber:${serialNumber}, HostName:${hostName}`);
            return Promise.resolve(res);
        }
        catch (error) {
            this.logger.error("This error occurred in DeviceRepository. Method Name: getDeviceInfoByHostOrSerial", error);
            return Promise.reject(error);
        }
    }
};
exports.DeviceRepository = DeviceRepository;
exports.DeviceRepository = DeviceRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(device_entity_1.Device)),
    __param(1, (0, typeorm_1.InjectRepository)(deviceHistory_entity_1.DeviceUsageHistory)),
    __param(2, (0, typeorm_1.InjectRepository)(osInfo_entity_1.OSInfo)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object])
], DeviceRepository);
//# sourceMappingURL=devices.repository.js.map