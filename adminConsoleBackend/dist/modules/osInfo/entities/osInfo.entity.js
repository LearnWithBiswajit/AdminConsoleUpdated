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
exports.OSInfo = void 0;
const enum_config_1 = require("../../../config/enum.config");
const typeorm_1 = require("typeorm");
let OSInfo = class OSInfo {
    osId;
    osType;
    osName;
    osVersion;
    isActive;
};
exports.OSInfo = OSInfo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { name: "OSId" }),
    __metadata("design:type", String)
], OSInfo.prototype, "osId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "OSType", nullable: false, default: enum_config_1.OSType.Linux, type: "tinyint" }),
    __metadata("design:type", Number)
], OSInfo.prototype, "osType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "OSName", nullable: false, type: "varchar" }),
    __metadata("design:type", String)
], OSInfo.prototype, "osName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "OSVersion", nullable: false, type: "varchar" }),
    __metadata("design:type", String)
], OSInfo.prototype, "osVersion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "IsActive", nullable: false, type: "tinyint" }),
    __metadata("design:type", Boolean)
], OSInfo.prototype, "isActive", void 0);
exports.OSInfo = OSInfo = __decorate([
    (0, typeorm_1.Entity)({ name: "OSInfo" })
], OSInfo);
//# sourceMappingURL=osInfo.entity.js.map