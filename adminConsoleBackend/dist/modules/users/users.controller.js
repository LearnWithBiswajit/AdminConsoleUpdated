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
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const user_dto_1 = require("./dto/user.dto");
const create_user_dto_1 = require("./dto/create-user.dto");
const crypto_1 = require("crypto");
const publicRoute_decorator_1 = require("../../decorators/publicRoute.decorator");
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("./entities/user.entity");
const user_decorator_1 = require("../../decorators/user.decorator");
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    logger = new common_1.Logger();
    async registerUser(userDto) {
        try {
            const res = await this.usersService.registerUser(userDto);
            return Promise.resolve(res);
        }
        catch (error) {
            this.logger.error("This error occurred in UserController. Method Name: registerUser", error);
            return Promise.reject(error);
        }
    }
    async allEmployees(query) {
        try {
            const res = await this.usersService.findAllUsersByType(query);
            return Promise.resolve(res);
        }
        catch (error) {
            this.logger.error("This error occurred in UserController. Method Name: allEmployees", error);
            return Promise.reject(error);
        }
    }
    async updateEmployee(body) {
        try {
            const res = await this.usersService.updateEmployee(body);
            return Promise.resolve({ res: res, message: "User Updated Successfully" });
        }
        catch (error) {
            this.logger.error("This error occurred in UserController. Method Name: updateEmployee", error);
            return Promise.reject(error);
        }
    }
    async deleteEmployee(userId) {
        try {
            let res = await this.usersService.deleteUserById(userId);
            if (res.affectedRows > 0) {
                return Promise.resolve({ message: "User Deleted Successfully" });
            }
        }
        catch (error) {
            this.logger.error("This error occurred in UserController. Method Name: deleteEmployee", error);
            return Promise.reject(error);
        }
    }
    async fetchEmployeeById(email) {
        try {
            let res = await this.usersService.getUserByEmail(email);
            return Promise.resolve(res);
        }
        catch (error) {
            this.logger.error("This error occurred in UserController. Method Name: deleteEmployee", error);
            return Promise.reject(error);
        }
    }
    async updateToAdmin(context, body) {
        try {
            const res = await this.usersService.updateToAdmin(body, context);
            return Promise.resolve({ userId: res.userId, message: "Admin Access Granted" });
        }
        catch (error) {
            this.logger.error("This error occurred in UserController. Method Name: updateEmployee", error);
            return Promise.reject(error);
        }
    }
    async revokeAdminPermission(context, body) {
        try {
            const res = await this.usersService.revokeAdminPermission(body, context);
            return Promise.resolve({ userId: res.userId, message: "Removed From Admin" });
        }
        catch (error) {
            this.logger.error("This error occurred in UserController. Method Name: revokeAdminPermission", error);
            return Promise.reject(error);
        }
    }
    async registerAppUser(body) {
        try {
            return Promise.resolve(this.usersService.registerAppUser(body));
        }
        catch (error) {
            this.logger.error("This error occurred in UserController. Method Name: registerAppUser", error);
            return Promise.reject(error);
        }
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({
        summary: 'Create new employees',
        description: 'Create a new employee in the database.'
    }),
    (0, swagger_1.ApiBody)({
        type: create_user_dto_1.CreateUserDTO
    }),
    (0, swagger_1.ApiCreatedResponse)({
        type: user_dto_1.UserDTO
    }),
    (0, common_1.Post)("/create"),
    (0, publicRoute_decorator_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDTO]),
    __metadata("design:returntype", typeof (_a = typeof Promise !== "undefined" && Promise) === "function" ? _a : Object)
], UsersController.prototype, "registerUser", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all the employees',
        description: 'Get the information of all the employees and search for a particular employee.'
    }),
    (0, common_1.Get)("/employee/active"),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.QueryAllEmployeesDTO]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], UsersController.prototype, "allEmployees", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Put)("/employee/edit"),
    (0, swagger_1.ApiBody)({
        type: create_user_dto_1.UpdateUserDTO
    }),
    (0, swagger_1.ApiOkResponse)({
        type: user_dto_1.UserDTO
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.UpdateUserDTO]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], UsersController.prototype, "updateEmployee", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete the employee',
        description: 'Delete the employee and release all devices assigned to him'
    }),
    (0, swagger_1.ApiParam)({
        name: 'userId',
        description: 'Id of the employee',
        type: String
    }),
    (0, common_1.Delete)("/:userId"),
    __param(0, (0, common_1.Param)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof crypto_1.UUID !== "undefined" && crypto_1.UUID) === "function" ? _d : Object]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], UsersController.prototype, "deleteEmployee", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get the employee information',
        description: 'Fetch the employee details by email id'
    }),
    (0, swagger_1.ApiQuery)({
        name: 'email',
        description: 'Email Id of the employee',
        type: String
    }),
    (0, common_1.Get)("/userInfo"),
    __param(0, (0, common_1.Query)("email")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], UsersController.prototype, "fetchEmployeeById", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiBody)({
        type: create_user_dto_1.UpdateUserDTO
    }),
    (0, common_1.Patch)("/changeTheRoleToAdmin"),
    __param(0, (0, user_decorator_1.CurrentContext)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, create_user_dto_1.UpdateUserDTO]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], UsersController.prototype, "updateToAdmin", null);
__decorate([
    (0, common_1.Patch)("/admin/revoke"),
    __param(0, (0, user_decorator_1.CurrentContext)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, create_user_dto_1.UpdateUserDTO]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], UsersController.prototype, "revokeAdminPermission", null);
__decorate([
    (0, common_1.Post)("/create"),
    (0, common_1.Version)("2"),
    (0, publicRoute_decorator_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDTO]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], UsersController.prototype, "registerAppUser", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)("Users"),
    (0, common_1.Controller)('users'),
    __param(0, (0, common_1.Inject)("IUserService")),
    __metadata("design:paramtypes", [Object])
], UsersController);
//# sourceMappingURL=users.controller.js.map