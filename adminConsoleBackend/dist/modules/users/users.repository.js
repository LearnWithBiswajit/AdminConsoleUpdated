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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
let UserRepository = class UserRepository {
    userRepo;
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    ;
    logger = new common_1.Logger();
    async insertUser(userEntity) {
        try {
            let res = await this.userRepo.save(userEntity);
            return Promise.resolve(res);
        }
        catch (error) {
            this.logger.error("This error occurred in UserRepository. Method Name: insertUser", error);
            return Promise.reject(error);
        }
    }
    async getAllUsersByType(query) {
        try {
            let res = this.userRepo.createQueryBuilder("user")
                .where("user.role IN (:...role)", { role: query.userType })
                .andWhere("isDeleted=:isDeleted", { isDeleted: 0 })
                .andWhere("isActive=:isActive", { isActive: 1 })
                .skip((query.page - 1) * query.limit)
                .take(query.limit);
            if (query.searchString && query.searchString.length > 0) {
                res = res.andWhere(new typeorm_2.Brackets((qb) => {
                    qb.where("user.firstName LIKE :searchString", { searchString: `%${query.searchString}%` })
                        .orWhere("user.middlename LIKE :searchString", { searchString: `%${query.searchString}%` })
                        .orWhere("user.lastName LIKE :searchString", { searchString: `%${query.searchString}%` })
                        .orWhere("user.Email LIKE :searchString", { searchString: `%${query.searchString}%` })
                        .orWhere("user.employeeID LIKE :searchString", { searchString: `%${query.searchString}%` });
                }));
            }
            let user = await res.getMany();
            return Promise.resolve(user);
        }
        catch (error) {
            this.logger.error("This error occured in UserRepository. Method Name: getAllEmployees", error);
            return Promise.reject(error);
        }
    }
    async deleteUserById(userId) {
        try {
            const res = await this.userRepo.update({ userId: userId }, { isDeleted: true, isActive: false });
            return Promise.resolve(res.affected ? res.affected : 0);
        }
        catch (error) {
            this.logger.error("This error occured in UserRepository. Method Name: deleteUserById", error);
            return Promise.reject(error);
        }
    }
    async getUserByEmail(email) {
        try {
            if (!email) {
                throw new Error("Email ID missing.");
            }
            let res = await this.userRepo.findOne({ where: { email: email, isActive: true, isDeleted: false } });
            return Promise.resolve(res);
        }
        catch (error) {
            this.logger.error("This error occured in UserRepository. Method Name: deleteUserById", error);
            return Promise.reject(error);
        }
    }
    async getTotalCountByType(query) {
        try {
            let res = this.userRepo.createQueryBuilder("user")
                .where("user.role IN (:...role)", { role: query.userType })
                .andWhere("isDeleted=:isDeleted", { isDeleted: false })
                .andWhere("isActive=:isActive", { isActive: true })
                .skip((query.page - 1) * query.limit)
                .take(query.limit);
            if (query.searchString && query.searchString.length > 0) {
                res = res.andWhere(new typeorm_2.Brackets((qb) => {
                    qb.where("user.firstName LIKE :searchString", { searchString: `%${query.searchString}%` })
                        .orWhere("user.middlename LIKE :searchString", { searchString: `%${query.searchString}%` })
                        .orWhere("user.lastName LIKE :searchString", { searchString: `%${query.searchString}%` })
                        .orWhere("user.Email LIKE :searchString", { searchString: `%${query.searchString}%` })
                        .orWhere("user.employeeID LIKE :searchString", { searchString: `%${query.searchString}%` });
                }));
            }
            let count = await res.getCount();
            return Promise.resolve({ TotalCount: count });
        }
        catch (error) {
            this.logger.error("This error occured in UserRepository. Method Name: getTotalCountByType", error);
            return Promise.reject(error);
        }
    }
    async updateEmployee(body) {
        try {
            let res = this.userRepo.save(body);
            return Promise.resolve(res);
        }
        catch (error) {
            this.logger.error("This error occured in UserRepository. Method Name: updateEmployee", error);
            return Promise.reject(error);
        }
    }
    async updateRole(body, role) {
        try {
            let res = await this.userRepo.update({ userId: body.userId }, { role: role });
            if (res.affected && res.affected > 0) {
                return Promise.resolve(res.affected);
            }
            else {
                return Promise.resolve(0);
            }
        }
        catch (error) {
            this.logger.error("This error occured in UserRepository. Method Name: updateEmployee", error);
            return Promise.reject(error);
        }
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], UserRepository);
//# sourceMappingURL=users.repository.js.map