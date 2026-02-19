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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevicesInfo = exports.BitLockerAndRecovaryKey = exports.AssigndeviceDTO = exports.Inventory = exports.QueryDevices = exports.DeviceCount = exports.DeviceDTO = void 0;
const class_validator_1 = require("@nestjs/class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_2 = require("class-validator");
const crypto_1 = require("crypto");
const enum_config_1 = require("../../../config/enum.config");
class DeviceDTO {
    id;
    osType;
    deviceType;
    deviceStatus;
    userId;
    macAddress;
    hostName;
    serialNumber;
    brand;
}
exports.DeviceDTO = DeviceDTO;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
        description: "Id of the device",
        readOnly: true
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", typeof (_a = typeof crypto_1.UUID !== "undefined" && crypto_1.UUID) === "function" ? _a : Object)
], DeviceDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: enum_config_1.OSType,
        description: "Os Type of the device in number: Linux = 1, MAC = 2, Windows = 3, Android = 4, IOS = 5",
        example: 3
    }),
    (0, class_validator_2.IsEnum)(enum_config_1.OSType),
    (0, class_validator_2.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], DeviceDTO.prototype, "osType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: enum_config_1.DeviceType,
        description: "Device Type of the device in number: Others = 1, Mobile = 2",
        example: 1
    }),
    (0, class_validator_2.IsEnum)(enum_config_1.DeviceType),
    (0, class_validator_2.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], DeviceDTO.prototype, "deviceType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: enum_config_1.DeviceStatus,
        description: "Device Status of the device in number: Active = 1, dead/unassigned = 2",
        example: 1
    }),
    (0, class_validator_2.IsEnum)(enum_config_1.DeviceStatus),
    (0, class_validator_2.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], DeviceDTO.prototype, "deviceStatus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
        description: "User Id of the device",
        example: "fdf44da2-68ee-4419-a874-351f290fcccf"
    }),
    (0, class_validator_2.IsString)(),
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", String)
], DeviceDTO.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Array,
        description: "MAC address of the device",
        example: ["AU-90-BU-90-R8-A8"]
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_2.IsString)({ each: true }),
    (0, class_validator_2.IsNotEmpty)(),
    __metadata("design:type", Array)
], DeviceDTO.prototype, "macAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: "Host Name of the device",
        example: "HTI879RDB "
    }),
    (0, class_validator_2.IsString)(),
    (0, class_validator_2.IsNotEmpty)(),
    __metadata("design:type", String)
], DeviceDTO.prototype, "hostName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: "Serial Number of the device",
        example: "NIUF794WTH"
    }),
    (0, class_validator_2.IsString)(),
    (0, class_validator_2.IsNotEmpty)(),
    __metadata("design:type", String)
], DeviceDTO.prototype, "serialNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: enum_config_1.BrandName,
        description: "Brand Name of the device using number: HP = 1,Apple = 2, Dell = 3, Lenovo = 4",
        example: 1
    }),
    (0, class_validator_2.IsEnum)(enum_config_1.BrandName),
    (0, class_validator_2.IsNotEmpty)(),
    __metadata("design:type", Number)
], DeviceDTO.prototype, "brand", void 0);
class DeviceCount extends (0, swagger_1.PickType)(DeviceDTO, ["deviceType", "deviceStatus", "osType"]) {
    count;
}
exports.DeviceCount = DeviceCount;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: "Total number of device with such os type, device type, and device status"
    }),
    __metadata("design:type", Number)
], DeviceCount.prototype, "count", void 0);
class QueryDevices extends (0, swagger_1.OmitType)(DeviceCount, ["count"]) {
    page;
    limit;
    osType;
    searchString;
    deviceType;
}
exports.QueryDevices = QueryDevices;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: "Page Number To be shown",
        example: 1
    }),
    (0, class_validator_2.IsNotEmpty)(),
    (0, class_validator_2.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], QueryDevices.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: "Limit in per page",
        example: 1
    }),
    (0, class_validator_2.IsNotEmpty)(),
    (0, class_validator_2.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], QueryDevices.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: enum_config_1.OSType,
        description: "Os Type of the device in number: Linux = 1, MAC = 2, Windows = 3, Android = 4, IOS = 5",
        example: 3
    }),
    (0, class_validator_2.IsEnum)(enum_config_1.OSType),
    (0, class_validator_2.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], QueryDevices.prototype, "osType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
        description: "Search string too serach devices using the serial number...",
        example: "NIUF794WTH"
    }),
    (0, class_validator_2.IsString)(),
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", String)
], QueryDevices.prototype, "searchString", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: Number,
        description: "Device Type of the device in number: Others = 1, Mobile = 2",
        example: 1
    }),
    (0, class_validator_2.IsEnum)(enum_config_1.DeviceType),
    (0, class_validator_2.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], QueryDevices.prototype, "deviceType", void 0);
class Inventory extends DeviceDTO {
    name;
    email;
}
exports.Inventory = Inventory;
__decorate([
    (0, class_validator_2.IsString)(),
    (0, class_validator_2.IsNotEmpty)(),
    __metadata("design:type", String)
], Inventory.prototype, "name", void 0);
__decorate([
    (0, class_validator_2.IsEmail)(),
    (0, class_validator_2.IsNotEmpty)(),
    __metadata("design:type", String)
], Inventory.prototype, "email", void 0);
class AssigndeviceDTO extends (0, swagger_1.PickType)(DeviceDTO, ["userId"]) {
    deviceIds;
}
exports.AssigndeviceDTO = AssigndeviceDTO;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Array,
        description: "Provide id for the device",
        example: ["adc4885f-cc7c-45bc-bf7b-806afb164008"]
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_2.IsNotEmpty)(),
    __metadata("design:type", Array)
], AssigndeviceDTO.prototype, "deviceIds", void 0);
class BitLockerAndRecovaryKey extends (0, swagger_1.PickType)(DeviceDTO, ["id"]) {
    bitlockerId;
    recoveryKey;
}
exports.BitLockerAndRecovaryKey = BitLockerAndRecovaryKey;
__decorate([
    (0, class_validator_2.IsNotEmpty)(),
    (0, class_validator_2.IsString)(),
    __metadata("design:type", String)
], BitLockerAndRecovaryKey.prototype, "bitlockerId", void 0);
__decorate([
    (0, class_validator_2.IsNotEmpty)(),
    (0, class_validator_2.IsString)(),
    __metadata("design:type", String)
], BitLockerAndRecovaryKey.prototype, "recoveryKey", void 0);
class DevicesInfo extends DeviceDTO {
    bitlockerId;
    recoveryKey;
}
exports.DevicesInfo = DevicesInfo;
__decorate([
    (0, class_validator_2.IsNotEmpty)(),
    (0, class_validator_2.IsString)(),
    __metadata("design:type", String)
], DevicesInfo.prototype, "bitlockerId", void 0);
__decorate([
    (0, class_validator_2.IsNotEmpty)(),
    (0, class_validator_2.IsString)(),
    __metadata("design:type", String)
], DevicesInfo.prototype, "recoveryKey", void 0);
//# sourceMappingURL=device.dto.js.map