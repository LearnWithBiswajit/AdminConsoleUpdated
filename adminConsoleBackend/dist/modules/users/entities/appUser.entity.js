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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppUser = void 0;
const crypto_1 = require("crypto");
const typeorm_1 = require("typeorm");
let AppUser = class AppUser {
    userId;
    employeeId;
    firstName;
    middleName;
    lastName;
    email;
    createDate;
    modifyDate;
    createBy;
    modifyBy;
    isActive;
};
exports.AppUser = AppUser;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: "UserID", type: "uuid", length: 36 }),
    __metadata("design:type", typeof (_a = typeof crypto_1.UUID !== "undefined" && crypto_1.UUID) === "function" ? _a : Object)
], AppUser.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "EmployeeID", type: "varchar", length: 255, nullable: false }),
    __metadata("design:type", String)
], AppUser.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "FirstName", type: "varchar", length: 255, nullable: false }),
    __metadata("design:type", String)
], AppUser.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "MiddleName", type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", String)
], AppUser.prototype, "middleName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "LastName", type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", String)
], AppUser.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "Email", type: "varchar", length: 255, nullable: false }),
    __metadata("design:type", String)
], AppUser.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "CreateDate", type: "timestamp", default: () => "CURRENT_TIMESTAMP", nullable: false }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], AppUser.prototype, "createDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "ModifyDate", type: "timestamp", default: () => "CURRENT_TIMESTAMP", nullable: true }),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], AppUser.prototype, "modifyDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "CreateBy", type: "char", length: 36, nullable: true }),
    __metadata("design:type", typeof (_d = typeof crypto_1.UUID !== "undefined" && crypto_1.UUID) === "function" ? _d : Object)
], AppUser.prototype, "createBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "modifyBy", type: "varchar", length: 36, nullable: true }),
    __metadata("design:type", typeof (_e = typeof crypto_1.UUID !== "undefined" && crypto_1.UUID) === "function" ? _e : Object)
], AppUser.prototype, "modifyBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "IsActive", type: "tinyint", default: () => 1, nullable: false }),
    __metadata("design:type", Boolean)
], AppUser.prototype, "isActive", void 0);
exports.AppUser = AppUser = __decorate([
    (0, typeorm_1.Entity)({ name: "AppUsers" })
], AppUser);
//# sourceMappingURL=appUser.entity.js.map