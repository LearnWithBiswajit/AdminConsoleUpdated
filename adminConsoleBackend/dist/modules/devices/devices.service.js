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
exports.DeviceService = void 0;
const common_1 = require("@nestjs/common");
const device_mapper_1 = require("./mapper/device.mapper");
const enum_config_1 = require("../../config/enum.config");
let DeviceService = class DeviceService {
    deviceRepository;
    constructor(deviceRepository) {
        this.deviceRepository = deviceRepository;
    }
    logger = new common_1.Logger();
    async allDevices(query) {
        try {
            let allDevice = await this.deviceRepository.findAllDevices(query);
            let deviceCount = await this.deviceRepository.findTotalCountByStatusAndDeviceType(query.deviceStatus, query.deviceType, query.osType, true, query.searchString);
            let resp = allDevice.map((item) => device_mapper_1.DeviceMapper.mapToDto(item));
            return Promise.resolve({
                response: resp,
                totalCount: Object(deviceCount)
            });
        }
        catch (error) {
            this.logger.error("This error occurred in DeviceService. Method Name: allDevices", error);
            return Promise.reject(error);
        }
    }
    async createDevice(deviceDto) {
        try {
            deviceDto.userId ? deviceDto.deviceStatus = enum_config_1.DeviceStatus.Active : deviceDto.deviceStatus = enum_config_1.DeviceStatus.Dead;
            let deviceEntity = device_mapper_1.DeviceMapper.mapToEntity(deviceDto);
            deviceEntity = await this.deviceRepository.insertDevice(deviceEntity);
            let res = device_mapper_1.DeviceMapper.mapToDto(deviceEntity);
            return Promise.resolve(res);
        }
        catch (error) {
            this.logger.error("This error occurred in DeviceService. Method Name: createDevice", error);
            return Promise.reject(error);
        }
    }
    async updateDeviceStatus(updateDeviceDTO, deviceIds) {
        try {
            let updateDeviceEntity = device_mapper_1.DeviceMapper.mapToEntity(updateDeviceDTO);
            let res = await this.deviceRepository.updateDeviceStatus(updateDeviceEntity, deviceIds);
            if (res > 0) {
                return Promise.resolve({ message: "Device updated successfully" });
            }
            return Promise.resolve({ message: "No devices were updated" });
        }
        catch (error) {
            this.logger.error("This error occurred in DeviceService. Method Name: updateDeviceStatus", error);
            return Promise.reject(error);
        }
    }
    async findTotalCountByStatusAndDeviceType(deviceStatus, deviceType, osType) {
        try {
            let res = await this.deviceRepository.findTotalCountByStatusAndDeviceType(deviceStatus, deviceType, osType);
            return Promise.resolve(res);
        }
        catch (error) {
            this.logger.error("This error occurred in DeviceService. Method Name: findTotalCountByStatusAndDeviceType", error);
            return Promise.reject(error);
        }
    }
    async getInventory(page, limit, searchString) {
        try {
            let res = await this.deviceRepository.getInventory(page, limit, searchString);
            let allDevies = res.map((item) => device_mapper_1.DeviceMapper.mapToInventory(item));
            let { TotalCount } = await this.deviceRepository.getInventoryCount(searchString);
            return Promise.resolve({ allDevies, totalCount: TotalCount });
        }
        catch (error) {
            this.logger.error("This error occurred in DeviceService. Method Name: getInventory", error);
            return Promise.reject(error);
        }
    }
    async deleteDeviceById(deviceId) {
        try {
            let res = await this.deviceRepository.deleteDevice(deviceId);
            if (res > 0) {
                return Promise.resolve("Device Deleted Successfully");
            }
            return Promise.resolve("Device Not Deleted. Some Error Occurred");
        }
        catch (error) {
            this.logger.error("This error occurred in DeviceService. Method Name: deleteDeviceById", error);
            return Promise.reject(error);
        }
    }
    async updateDevice(body) {
        try {
            let deviceEntity = device_mapper_1.DeviceMapper.mapToEntity(body);
            let res = await this.deviceRepository.updateDevice(deviceEntity);
            let device;
            device = device_mapper_1.DeviceMapper.mapToDto(res);
            return Promise.resolve(device);
        }
        catch (error) {
            this.logger.error("This error occurred in DeviceService. Method Name: updateDevice", error);
            return Promise.reject(error);
        }
    }
    async markAsDeadDevice(deviceId) {
        try {
            let res = await this.deviceRepository.markAsDeadDevice(deviceId);
            return Promise.resolve(res);
        }
        catch (error) {
            this.logger.error("This error occurred in DeviceService. Method Name: markAsDeadDevice", error);
            return Promise.reject(error);
        }
    }
    async addBitlockerKey(info) {
        try {
            let res = await this.deviceRepository.addBitlockerKey(info);
            if (res === 0) {
                throw new common_1.HttpException("Device Not Found", 404);
            }
            return Promise.resolve("Bitlocker Added Successfully");
        }
        catch (error) {
            this.logger.error("This error occurred in DeviceService. Method Name: addBitlockerKry", error);
            return Promise.reject(error);
        }
    }
};
exports.DeviceService = DeviceService;
exports.DeviceService = DeviceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("IDeviceRepository")),
    __metadata("design:paramtypes", [Object])
], DeviceService);
//# sourceMappingURL=devices.service.js.map