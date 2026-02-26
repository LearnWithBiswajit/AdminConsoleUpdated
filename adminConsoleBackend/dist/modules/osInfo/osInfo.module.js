"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OSInfoModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const osInfo_entity_1 = require("./entities/osInfo.entity");
const osInfo_controller_1 = require("./osInfo.controller");
const osInfo_service_1 = require("./osInfo.service");
const osInfo_repository_1 = require("./osInfo.repository");
let OSInfoModule = class OSInfoModule {
};
exports.OSInfoModule = OSInfoModule;
exports.OSInfoModule = OSInfoModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([osInfo_entity_1.OSInfo])],
        controllers: [osInfo_controller_1.OSInfoController],
        providers: [{ provide: "IOSInfoService", useClass: osInfo_service_1.OSInfoService }, { provide: "IOSInfoRepository", useClass: osInfo_repository_1.OSInfoRepository }],
        exports: ["IOSInfoService"]
    })
], OSInfoModule);
//# sourceMappingURL=osInfo.module.js.map