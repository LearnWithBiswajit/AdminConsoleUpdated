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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceUsageHistory = void 0;
const enum_config_1 = require("../../../config/enum.config");
const typeorm_1 = require("typeorm");
let DeviceUsageHistory = class DeviceUsageHistory {
    id;
    osType;
    deviceType;
    deviceStatus;
    userId;
    macAddress;
    hostName;
    serialNumber;
    brand;
};
exports.DeviceUsageHistory = DeviceUsageHistory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid", { name: "Id" }),
    __metadata("design:type", String)
], DeviceUsageHistory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "OSType", nullable: false, default: enum_config_1.OSType.Linux }),
    __metadata("design:type", Number)
], DeviceUsageHistory.prototype, "osType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "DeviceType", nullable: false, default: enum_config_1.DeviceType.Others }),
    __metadata("design:type", Number)
], DeviceUsageHistory.prototype, "deviceType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "Status", nullable: false, default: enum_config_1.DeviceStatus.Active }),
    __metadata("design:type", Number)
], DeviceUsageHistory.prototype, "deviceStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "UserID", nullable: true }),
    __metadata("design:type", String)
], DeviceUsageHistory.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "MACAddress", nullable: false, unique: true, type: "json" }),
    __metadata("design:type", Array)
], DeviceUsageHistory.prototype, "macAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "HostName", nullable: false, unique: true }),
    __metadata("design:type", String)
], DeviceUsageHistory.prototype, "hostName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "SerialNumber", nullable: false, unique: true }),
    __metadata("design:type", String)
], DeviceUsageHistory.prototype, "serialNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "Brand", nullable: false }),
    __metadata("design:type", Number)
], DeviceUsageHistory.prototype, "brand", void 0);
exports.DeviceUsageHistory = DeviceUsageHistory = __decorate([
    (0, typeorm_1.Entity)({ name: "DevicesUsageHistory" })
], DeviceUsageHistory);
//# sourceMappingURL=deviceHistory.entity.js.map