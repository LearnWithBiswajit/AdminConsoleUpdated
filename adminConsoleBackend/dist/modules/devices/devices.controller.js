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
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevicesController = void 0;
const common_1 = require("@nestjs/common");
const device_dto_1 = require("./dto/device.dto");
const updateDevice_dto_1 = require("./dto/updateDevice.dto");
const enum_config_1 = require("../../config/enum.config");
const crypto_1 = require("crypto");
const swagger_1 = require("@nestjs/swagger");
const user_decorator_1 = require("../../decorators/user.decorator");
let DevicesController = class DevicesController {
    devicesService;
    constructor(devicesService) {
        this.devicesService = devicesService;
    }
    logger = new common_1.Logger();
    async getAllDevices(context, query) {
        try {
            console.log(context);
            const resp = await this.devicesService.allDevices(query);
            return Promise.resolve(resp);
        }
        catch (error) {
            this.logger.error("This error occurred in Device Controller. Method Name: getAllDevices", error);
            return Promise.reject(error);
        }
    }
    async createDevice(deviceDto) {
        try {
            const res = await this.devicesService.createDevice(deviceDto);
            return Promise.resolve(res);
        }
        catch (error) {
            this.logger.error("This error occurred in Device Controller. Method Name: createDevice", error);
            return Promise.reject(error);
        }
    }
    async updateDeviceStatus(updateDeviceDTO) {
        try {
            let res = await this.devicesService.updateDeviceStatus(updateDeviceDTO);
            return Promise.resolve(res);
        }
        catch (error) {
            this.logger.error("This error occurred in Device Controller. Method Name: updateDeviceStatus", error);
            return Promise.reject(error);
        }
    }
    async countByStatusAndDeviceType(deviceStatus, deviceType, osType) {
        try {
            let res = await this.devicesService.findTotalCountByStatusAndDeviceType(deviceStatus, deviceType, osType);
            return Promise.resolve(res);
        }
        catch (error) {
            this.logger.error("This error occurred in Device Controller. Method Name: countByStatusAndDeviceType", error);
            return Promise.reject(error);
        }
    }
    async getInventory(page, limit, searchString) {
        try {
            let res = await this.devicesService.getInventory(page, limit, searchString);
            return Promise.resolve(res);
        }
        catch (error) {
            this.logger.error("This error occurred in Device Controller. Method Name: getInventory", error);
            return Promise.reject(error);
        }
    }
    async deleteDevice(deviceId) {
        try {
            let res = await this.devicesService.deleteDeviceById(deviceId);
            return Promise.resolve({ message: res });
        }
        catch (error) {
            this.logger.error("This error occurred in Device Controller. Method Name: getInventory", error);
            return Promise.reject(error);
        }
    }
    async editDevice(updatedDevice) {
        try {
            const res = await this.devicesService.updateDevice(updatedDevice);
            return Promise.resolve({ res: res, message: "Device Updated Successfully" });
        }
        catch (error) {
            this.logger.error("This error occurred in DeviceController. Method Name: editDevice", error);
            return Promise.reject(error);
        }
    }
    async addBitLockerKey(info) {
        try {
            const res = await this.devicesService.addBitlockerKey(info);
            return Promise.resolve({ data: info, message: res });
        }
        catch (error) {
            this.logger.error("This error occured in DeviceController. Method Name: addBitLockerKey", error);
            return Promise.reject(error);
        }
    }
};
exports.DevicesController = DevicesController;
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get information of the device',
        description: 'Get information of the device using the searchstring, os type, device type and device status ',
    }),
    (0, common_1.Get)("/"),
    __param(0, (0, user_decorator_1.CurrentContext)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, device_dto_1.QueryDevices]),
    __metadata("design:returntype", typeof (_a = typeof Promise !== "undefined" && Promise) === "function" ? _a : Object)
], DevicesController.prototype, "getAllDevices", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({
        summary: 'Insert new device information',
        description: 'Insert the information abount the  new device that is not present before ',
    }),
    (0, swagger_1.ApiBody)({
        type: device_dto_1.DeviceDTO
    }),
    (0, swagger_1.ApiCreatedResponse)({
        type: device_dto_1.DeviceDTO
    }),
    (0, common_1.Post)("/"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [device_dto_1.DeviceDTO]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], DevicesController.prototype, "createDevice", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({
        summary: 'Updating the device status',
        description: 'Updating ythe device status to dead or active state. If dead state removing the user Id',
    }),
    (0, swagger_1.ApiBody)({
        type: updateDevice_dto_1.UpdateDeviceDTO
    }),
    (0, swagger_1.ApiAcceptedResponse)({
        type: Object
    }),
    (0, common_1.Patch)("/status"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateDevice_dto_1.UpdateDeviceDTO]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], DevicesController.prototype, "updateDeviceStatus", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({
        summary: 'Count the total number of device',
        description: 'Count the number of device by device type, device status andos type.',
    }),
    (0, swagger_1.ApiQuery)({
        enum: enum_config_1.DeviceType,
        name: "deviceType",
        description: "Type of the device"
    }),
    (0, swagger_1.ApiQuery)({
        enum: enum_config_1.OSType,
        name: "osType",
        description: "Type of the os in the device",
        required: false
    }),
    (0, swagger_1.ApiQuery)({
        enum: enum_config_1.DeviceStatus,
        name: "deviceStatus",
        description: "Status of the device"
    }),
    (0, common_1.Get)("/count"),
    __param(0, (0, common_1.Query)("deviceStatus")),
    __param(1, (0, common_1.Query)("deviceType")),
    __param(2, (0, common_1.Query)("osType")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], DevicesController.prototype, "countByStatusAndDeviceType", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get information of the active device and the person to whome it is assigned',
        description: 'Get information of the active device and the person to whome it is assigned',
    }),
    (0, swagger_1.ApiQuery)({
        type: Number,
        name: 'page',
        example: 1
    }),
    (0, swagger_1.ApiQuery)({
        type: Number,
        name: 'limit',
        description: 'Total data per page',
        example: 1
    }),
    (0, swagger_1.ApiQuery)({
        type: String,
        name: 'searchString',
        description: 'Search value like serial number, name and email',
        example: "6Q",
        required: false
    }),
    (0, common_1.Get)('/getInventory'),
    __param(0, (0, common_1.Query)("page")),
    __param(1, (0, common_1.Query)("limit")),
    __param(2, (0, common_1.Query)("searchString")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], DevicesController.prototype, "getInventory", null);
__decorate([
    (0, common_1.Delete)("/:deviceId"),
    __param(0, (0, common_1.Param)("deviceId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof crypto_1.UUID !== "undefined" && crypto_1.UUID) === "function" ? _f : Object]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], DevicesController.prototype, "deleteDevice", null);
__decorate([
    (0, common_1.Put)('/editDevice'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [device_dto_1.DeviceDTO]),
    __metadata("design:returntype", Promise)
], DevicesController.prototype, "editDevice", null);
__decorate([
    (0, common_1.Put)('/addBitlocker'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [device_dto_1.BitLockerAndRecovaryKey]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], DevicesController.prototype, "addBitLockerKey", null);
exports.DevicesController = DevicesController = __decorate([
    (0, swagger_1.ApiTags)('Devices'),
    (0, common_1.Controller)('devices'),
    __param(0, (0, common_1.Inject)("IDeviceService")),
    __metadata("design:paramtypes", [Object])
], DevicesController);
//# sourceMappingURL=devices.controller.js.map