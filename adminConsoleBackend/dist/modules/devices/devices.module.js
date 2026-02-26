"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevicesModule = void 0;
const common_1 = require("@nestjs/common");
const devices_service_1 = require("./devices.service");
const devices_controller_1 = require("./devices.controller");
const devices_repository_1 = require("./devices.repository");
const typeorm_1 = require("@nestjs/typeorm");
const device_entity_1 = require("./entities/device.entity");
const deviceHistory_entity_1 = require("./entities/deviceHistory.entity");
const osInfo_entity_1 = require("../osInfo/entities/osInfo.entity");
const osInfo_module_1 = require("../osInfo/osInfo.module");
let DevicesModule = class DevicesModule {
};
exports.DevicesModule = DevicesModule;
exports.DevicesModule = DevicesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([device_entity_1.Device, deviceHistory_entity_1.DeviceUsageHistory, osInfo_entity_1.OSInfo]), osInfo_module_1.OSInfoModule],
        controllers: [devices_controller_1.DevicesController],
        providers: [{ provide: "IDevicesService", useClass: devices_service_1.DeviceService }, { provide: "IDeviceRepository", useClass: devices_repository_1.DeviceRepository }],
        exports: ["IDevicesService", "IDeviceRepository", typeorm_1.TypeOrmModule.forFeature([osInfo_entity_1.OSInfo])]
    })
], DevicesModule);
//# sourceMappingURL=devices.module.js.map