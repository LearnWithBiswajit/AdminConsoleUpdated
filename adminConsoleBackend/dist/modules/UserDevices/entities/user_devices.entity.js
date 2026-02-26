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
exports.UsersAssets = void 0;
const typeorm_1 = require("typeorm");
let UsersAssets = class UsersAssets {
    assetId;
    userId;
    deviceId;
};
exports.UsersAssets = UsersAssets;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid", { name: "Id" }),
    __metadata("design:type", String)
], UsersAssets.prototype, "assetId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "userId" }),
    __metadata("design:type", String)
], UsersAssets.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "deviceId" }),
    __metadata("design:type", String)
], UsersAssets.prototype, "deviceId", void 0);
exports.UsersAssets = UsersAssets = __decorate([
    (0, typeorm_1.Entity)({ name: "UsersAssets" })
], UsersAssets);
//# sourceMappingURL=user_devices.entity.js.map