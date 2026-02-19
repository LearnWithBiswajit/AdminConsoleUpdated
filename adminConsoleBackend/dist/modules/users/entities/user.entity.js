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
exports.User = void 0;
const crypto_1 = require("crypto");
const enum_config_1 = require("../../../config/enum.config");
const typeorm_1 = require("typeorm");
let User = class User {
    userId;
    employeeId;
    firstName;
    middleName;
    lastName;
    email;
    password;
    createDate;
    modifyDate;
    role;
    createBy;
    modifyBy;
    isActive;
    isDeleted;
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid", { name: "UserID" }),
    __metadata("design:type", typeof (_a = typeof crypto_1.UUID !== "undefined" && crypto_1.UUID) === "function" ? _a : Object)
], User.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "EmployeeID" }),
    __metadata("design:type", String)
], User.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "FirstName" }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "MiddleName" }),
    __metadata("design:type", String)
], User.prototype, "middleName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "LastName" }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "Email" }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "Password" }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "CreateDate" }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], User.prototype, "createDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "ModifyDate" }),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], User.prototype, "modifyDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "Role" }),
    __metadata("design:type", Number)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "CreateBy" }),
    __metadata("design:type", String)
], User.prototype, "createBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "ModifyBy" }),
    __metadata("design:type", String)
], User.prototype, "modifyBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "IsActive" }),
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "IsDeleted" }),
    __metadata("design:type", Boolean)
], User.prototype, "isDeleted", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)({ name: "Users" })
], User);
//# sourceMappingURL=user.entity.js.map