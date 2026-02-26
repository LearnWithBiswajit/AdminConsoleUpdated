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
exports.Device = void 0;
const enum_config_1 = require("../../../config/enum.config");
const typeorm_1 = require("typeorm");
let Device = class Device {
    id;
    osId;
    deviceType;
    deviceStatus;
    macAddress;
    hostName;
    serialNumber;
    brand;
    isDeleted;
    bitlockerId;
    recoveryKey;
};
exports.Device = Device;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid", { name: "Id" }),
    __metadata("design:type", String)
], Device.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "OSId", nullable: false }),
    __metadata("design:type", String)
], Device.prototype, "osId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "DeviceType", nullable: false, default: enum_config_1.DeviceType.Others }),
    __metadata("design:type", Number)
], Device.prototype, "deviceType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "Status", nullable: false, default: enum_config_1.DeviceStatus.Dead }),
    __metadata("design:type", Number)
], Device.prototype, "deviceStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "MACAddress", nullable: false, unique: true, type: "json" }),
    __metadata("design:type", Array)
], Device.prototype, "macAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "HostName", nullable: false, unique: true }),
    __metadata("design:type", String)
], Device.prototype, "hostName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "SerialNumber", nullable: false, unique: true }),
    __metadata("design:type", String)
], Device.prototype, "serialNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "Brand", nullable: false }),
    __metadata("design:type", Number)
], Device.prototype, "brand", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "IsDeleted", nullable: false, default: 0 }),
    __metadata("design:type", Boolean)
], Device.prototype, "isDeleted", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "BitlockerID" }),
    __metadata("design:type", String)
], Device.prototype, "bitlockerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "RecoveryKey" }),
    __metadata("design:type", String)
], Device.prototype, "recoveryKey", void 0);
exports.Device = Device = __decorate([
    (0, typeorm_1.Entity)({ name: "Devices" })
], Device);
//# sourceMappingURL=device.entity.js.map