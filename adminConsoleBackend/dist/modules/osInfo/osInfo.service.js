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
exports.OSInfoService = void 0;
const common_1 = require("@nestjs/common");
const osInfo_mapper_1 = require("./mapper/osInfo.mapper");
let OSInfoService = class OSInfoService {
    osInfoRepository;
    constructor(osInfoRepository) {
        this.osInfoRepository = osInfoRepository;
    }
    logger = new common_1.Logger();
    async allOSInfo() {
        try {
            let allOS = await this.osInfoRepository.getAll();
            let res = allOS.map((os) => osInfo_mapper_1.OSMapper.mapToDto(os));
            return Promise.resolve(res);
        }
        catch (error) {
            this.logger.error("This error occurred in osInfoService. Method Name: allOSInfo", error);
            return Promise.reject(error);
        }
    }
    async osInfoByVersion(version, osType) {
        try {
            let osInfo = await this.osInfoRepository.getOsInfoByVersion(version, osType);
            let res = osInfo_mapper_1.OSMapper.mapToDto(osInfo);
            return Promise.resolve(res);
        }
        catch (error) {
            this.logger.error("This error occurred in OSInfoService. Method Name: osInfoByVersion", error);
            return Promise.reject(error);
        }
    }
};
exports.OSInfoService = OSInfoService;
exports.OSInfoService = OSInfoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("IOSInfoRepository")),
    __metadata("design:paramtypes", [Object])
], OSInfoService);
//# sourceMappingURL=osInfo.service.js.map