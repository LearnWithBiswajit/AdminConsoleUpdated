"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const users_controller_1 = require("./users.controller");
const users_repository_1 = require("./users.repository");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const devices_module_1 = require("../devices/devices.module");
const devices_service_1 = require("../devices/devices.service");
const devices_repository_1 = require("../devices/devices.repository");
const device_entity_1 = require("../devices/entities/device.entity");
const deviceHistory_entity_1 = require("../devices/entities/deviceHistory.entity");
const userAssignedToUser_service_1 = require("../UserDevices/userAssignedToUser.service");
const userAssignedToDevices_module_1 = require("../UserDevices/userAssignedToDevices.module");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, device_entity_1.Device, deviceHistory_entity_1.DeviceUsageHistory]), devices_module_1.DevicesModule, userAssignedToDevices_module_1.UserDeviceMapper],
        controllers: [users_controller_1.UsersController],
        providers: [{ provide: "IUserService", useClass: users_service_1.UsersService }, { provide: "IUserRepository", useClass: users_repository_1.UserRepository }, { provide: "IDevicesService", useClass: devices_service_1.DeviceService }, { provide: "IDeviceRepository", useClass: devices_repository_1.DeviceRepository }, { provide: "IUserDevicesService", useClass: userAssignedToUser_service_1.UserDevicesService }],
        exports: [UsersModule, { provide: "IUserRepository", useClass: users_repository_1.UserRepository },]
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map