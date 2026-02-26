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
exports.QueryAllEmployeesDTO = exports.UserDTO = void 0;
const create_user_dto_1 = require("./create-user.dto");
const class_validator_1 = require("@nestjs/class-validator");
const crypto_1 = require("crypto");
const class_validator_2 = require("class-validator");
const enum_config_1 = require("../../../config/enum.config");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class UserDTO extends (0, swagger_1.OmitType)(create_user_dto_1.CreateUserDTO, ["password"]) {
    userId;
    role;
}
exports.UserDTO = UserDTO;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: "Email of the user"
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", typeof (_a = typeof crypto_1.UUID !== "undefined" && crypto_1.UUID) === "function" ? _a : Object)
], UserDTO.prototype, "userId", void 0);
class QueryAllEmployeesDTO {
    userType;
    limit;
    page;
    searchString;
}
exports.QueryAllEmployeesDTO = QueryAllEmployeesDTO;
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: enum_config_1.UserRole,
        description: "Role of the user",
        example: [enum_config_1.UserRole.Admin, enum_config_1.UserRole.Employee],
        isArray: true,
        type: [Number]
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_2.IsArray)(),
    (0, class_validator_2.IsEnum)(enum_config_1.UserRole, { each: true }),
    (0, class_transformer_1.Transform)(({ value }) => {
        try {
            const parsed = JSON.parse(value);
            if (Array.isArray(parsed))
                return parsed.map(Number);
        }
        catch {
            return value.split(',').map(Number);
            return value;
        }
    }),
    __metadata("design:type", Array)
], QueryAllEmployeesDTO.prototype, "userType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'limit of per page'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_2.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], QueryAllEmployeesDTO.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_2.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], QueryAllEmployeesDTO.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
        description: 'String to be searched based on the basis of name, email and employee id'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", String)
], QueryAllEmployeesDTO.prototype, "searchString", void 0);
//# sourceMappingURL=user.dto.js.map