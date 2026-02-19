"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDeviceMapper = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_devices_entity_1 = require("./entities/user_devices.entity");
const userAssignedToUser_controller_1 = require("./userAssignedToUser.controller");
const userAssignedToUser_service_1 = require("./userAssignedToUser.service");
const userAssignedToUser_repository_1 = require("./userAssignedToUser.repository");
const device_entity_1 = require("../devices/entities/device.entity");
const user_entity_1 = require("../users/entities/user.entity");
const devices_service_1 = require("../devices/devices.service");
const devices_module_1 = require("../devices/devices.module");
const devices_repository_1 = require("../devices/devices.repository");
const deviceHistory_entity_1 = require("../devices/entities/deviceHistory.entity");
let UserDeviceMapper = class UserDeviceMapper {
};
exports.UserDeviceMapper = UserDeviceMapper;
exports.UserDeviceMapper = UserDeviceMapper = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_devices_entity_1.UsersAssets, device_entity_1.Device, user_entity_1.User, deviceHistory_entity_1.DeviceUsageHistory]), devices_module_1.DevicesModule],
        controllers: [userAssignedToUser_controller_1.UsersDevicesController],
        providers: [{ provide: "IUserDevicesService", useClass: userAssignedToUser_service_1.UserDevicesService }, { provide: "IUsersDevicesRepository", useClass: userAssignedToUser_repository_1.UsersDevicesRepository }, { provide: "IDevicesService", useClass: devices_service_1.DeviceService }, { provide: "IDeviceRepository", useClass: devices_repository_1.DeviceRepository }],
        exports: [UserDeviceMapper, { provide: "IUsersDevicesRepository", useClass: userAssignedToUser_repository_1.UsersDevicesRepository },]
    })
], UserDeviceMapper);
//# sourceMappingURL=userAssignedToDevices.module.js.map