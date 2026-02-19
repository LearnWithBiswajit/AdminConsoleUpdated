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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inventory = exports.User_Device = exports.UserToDevice = void 0;
const class_validator_1 = require("@nestjs/class-validator");
const class_validator_2 = require("class-validator");
const crypto_1 = require("crypto");
const device_dto_1 = require("../../devices/dto/device.dto");
class UserToDevice {
    id;
    userId;
    deviceIds;
}
exports.UserToDevice = UserToDevice;
__decorate([
    (0, class_validator_2.IsUUID)(),
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", typeof (_a = typeof crypto_1.UUID !== "undefined" && crypto_1.UUID) === "function" ? _a : Object)
], UserToDevice.prototype, "id", void 0);
__decorate([
    (0, class_validator_2.IsUUID)(),
    (0, class_validator_2.IsNotEmpty)(),
    __metadata("design:type", typeof (_b = typeof crypto_1.UUID !== "undefined" && crypto_1.UUID) === "function" ? _b : Object)
], UserToDevice.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_2.IsString)({ each: true }),
    (0, class_validator_2.IsNotEmpty)(),
    __metadata("design:type", Array)
], UserToDevice.prototype, "deviceIds", void 0);
class User_Device extends UserToDevice {
    deviceId;
}
exports.User_Device = User_Device;
__decorate([
    (0, class_validator_2.IsUUID)(),
    (0, class_validator_2.IsNotEmpty)(),
    __metadata("design:type", typeof (_c = typeof crypto_1.UUID !== "undefined" && crypto_1.UUID) === "function" ? _c : Object)
], User_Device.prototype, "deviceId", void 0);
class Inventory extends device_dto_1.DeviceDTO {
    name;
    email;
    assetId;
    bitlockerId;
    recoveryKey;
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
__decorate([
    (0, class_validator_2.IsNotEmpty)(),
    (0, class_validator_2.IsUUID)(),
    __metadata("design:type", String)
], Inventory.prototype, "assetId", void 0);
__decorate([
    (0, class_validator_2.IsString)(),
    __metadata("design:type", String)
], Inventory.prototype, "bitlockerId", void 0);
__decorate([
    (0, class_validator_2.IsString)(),
    __metadata("design:type", String)
], Inventory.prototype, "recoveryKey", void 0);
//# sourceMappingURL=userAssignedToDevice.dto.js.map