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
const device_entity_1 = require("../devices/entities/device.entity");
const deviceHistory_entity_1 = require("../devices/entities/deviceHistory.entity");
const userAssignedToDevices_module_1 = require("../UserDevices/userAssignedToDevices.module");
const appUser_entity_1 = require("./entities/appUser.entity");
const osInfo_module_1 = require("../osInfo/osInfo.module");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, device_entity_1.Device, deviceHistory_entity_1.DeviceUsageHistory, appUser_entity_1.AppUser]), devices_module_1.DevicesModule, userAssignedToDevices_module_1.UserDeviceMapper, osInfo_module_1.OSInfoModule],
        controllers: [users_controller_1.UsersController],
        providers: [{ provide: "IUserService", useClass: users_service_1.UsersService }, { provide: "IUserRepository", useClass: users_repository_1.UserRepository },
        ],
        exports: ["IUserService", { provide: "IUserRepository", useClass: users_repository_1.UserRepository },]
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map