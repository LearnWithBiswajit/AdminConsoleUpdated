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
exports.OSInfoRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const osInfo_entity_1 = require("./entities/osInfo.entity");
const typeorm_2 = require("typeorm");
let OSInfoRepository = class OSInfoRepository {
    osInfoRepository;
    constructor(osInfoRepository) {
        this.osInfoRepository = osInfoRepository;
    }
    logger = new common_1.Logger();
    async getAll() {
        try {
            this.logger.log(`Execution Started to get all active OS Versions`);
            let res = await this.osInfoRepository.find({ where: { isActive: true } });
            this.logger.log(`Execution Completed to get all active OS Versions`);
            return Promise.resolve(res);
        }
        catch (error) {
            this.logger.error(error);
            return Promise.reject(error);
        }
    }
    async getOsInfoByVersion(version, osType) {
        try {
            this.logger.log(`Execution started to get os information by osVersion: ${version}`);
            let res = await this.osInfoRepository.findOneOrFail({ where: { osVersion: version, osType: osType } });
            4;
            this.logger.log(`Execution completed to get os information by osVersion: ${version}`);
            return Promise.resolve(res);
        }
        catch (error) {
            this.logger.error("This error occurred in OSInfoRepository. MethodName: getOsInfoByVersion", error);
            return Promise.reject(error);
        }
    }
};
exports.OSInfoRepository = OSInfoRepository;
exports.OSInfoRepository = OSInfoRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(osInfo_entity_1.OSInfo)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], OSInfoRepository);
//# sourceMappingURL=osInfo.repository.js.map