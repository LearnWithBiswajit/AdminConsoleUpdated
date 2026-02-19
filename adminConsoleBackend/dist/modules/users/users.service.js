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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const user_mapper_1 = require("./mapper/user.mapper");
const bcrypt = require("bcrypt");
const enum_config_1 = require("../../config/enum.config");
let UsersService = class UsersService {
    userRepository;
    deviceService;
    assetsServices;
    constructor(userRepository, deviceService, assetsServices) {
        this.userRepository = userRepository;
        this.deviceService = deviceService;
        this.assetsServices = assetsServices;
    }
    logger = new common_1.Logger();
    async registerUser(userInfo) {
        try {
            let user = await this.getUserByEmail(userInfo.email);
            if (user !== null) {
                throw new Error("Email Already Exists");
            }
            const salt = await bcrypt.genSalt(12);
            userInfo.password = await bcrypt.hash(userInfo.password, salt);
            let userEntity = user_mapper_1.UserMapper.mapToEntity(userInfo);
            userEntity = await this.userRepository.insertUser(userEntity);
            let userDto = user_mapper_1.UserMapper.mapToDTO(userEntity);
            return Promise.resolve(userDto);
        }
        catch (error) {
            this.logger.error("This error occurred in UserService. Method Name:registerUser", error);
            return Promise.reject(error);
        }
    }
    async findAllUsersByType(query) {
        try {
            const employees = await this.userRepository.getAllUsersByType(query);
            const res = employees.map((employee) => user_mapper_1.UserMapper.mapToDTO(employee));
            const { TotalCount } = await this.userRepository.getTotalCountByType(query);
            return Promise.resolve({ employees: res, totalCount: TotalCount });
        }
        catch (error) {
            this.logger.error("This error occurred in UserService. Method Name: findAllUsersByType", error);
            return Promise.reject(error);
        }
    }
    async deleteUserById(userId) {
        try {
            let userRes = await this.userRepository.deleteUserById(userId);
            let deviceRes;
            if (userRes > 0) {
                deviceRes = await this.assetsServices.deleteAssignedDevicesOfUser(userId);
            }
            return Promise.resolve({ affectedRows: userRes });
        }
        catch (error) {
            this.logger.error("This error occurred in UserService. Method Name: deleteUserById", error);
            return Promise.reject(error);
        }
    }
    async getUserByEmail(email) {
        try {
            let res = await this.userRepository.getUserByEmail(email);
            let user;
            if (res !== null) {
                user = user_mapper_1.UserMapper.mapToDTO(res);
            }
            return Promise.resolve(res);
        }
        catch (error) {
            this.logger.error("This error occurred in UserService. Method Name: deleteUserById", error);
            return Promise.reject(error);
        }
    }
    async updateEmployee(body) {
        try {
            if (body.password) {
                const salt = await bcrypt.genSalt(12);
                body.password = await bcrypt.hash(body.password, salt);
            }
            let userEntity = user_mapper_1.UserMapper.mapToUpdateEntity(body);
            let res = await this.userRepository.updateEmployee(userEntity);
            let user;
            user = user_mapper_1.UserMapper.mapToDTO(res);
            return Promise.resolve(user);
        }
        catch (error) {
            this.logger.error("This error occurred in UserService. Method Name: updateEmployee", error);
            return Promise.reject(error);
        }
    }
    async updateToAdmin(body, userInfo) {
        try {
            if (userInfo.role !== enum_config_1.UserRole.SuperAdmin) {
                throw new Error("You are not authorized to perform this operation");
            }
            let res = await this.userRepository.updateRole(body, enum_config_1.UserRole.Admin);
            if (res > 0) {
                return Promise.resolve({ userId: body.userId });
            }
            return Promise.resolve({ message: "No Such User Found" });
        }
        catch (error) {
            this.logger.error("This error occurred in UserService. Method Name: updateToAdmin", error);
            return Promise.reject(error);
        }
    }
    async revokeAdminPermission(body, userInfo) {
        try {
            if (userInfo.role !== enum_config_1.UserRole.SuperAdmin) {
                throw new Error("You are not authorized to perform this operation");
            }
            let res = await this.userRepository.updateRole(body, enum_config_1.UserRole.Employee);
            if (res > 0) {
                return Promise.resolve({ userId: body.userId });
            }
            return Promise.resolve({ message: "No Such User Found" });
        }
        catch (error) {
            this.logger.error("This error occurred in UserService. Method Name: revokeAdminPermission", error);
            return Promise.reject(error);
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("IUserRepository")),
    __param(1, (0, common_1.Inject)("IDevicesService")),
    __param(2, (0, common_1.Inject)("IUserDevicesService")),
    __metadata("design:paramtypes", [Object, Object, Object])
], UsersService);
//# sourceMappingURL=users.service.js.map