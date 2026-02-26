"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const db_config_1 = require("./config/db.config");
const devices_module_1 = require("./modules/devices/devices.module");
const core_1 = require("@nestjs/core");
const transform_interceptor_1 = require("./interceptors/transform.interceptor");
const users_module_1 = require("./modules/users/users.module");
const auth_module_1 = require("./auth/auth.module");
const user_entity_1 = require("./modules/users/entities/user.entity");
const device_entity_1 = require("./modules/devices/entities/device.entity");
const deviceHistory_entity_1 = require("./modules/devices/entities/deviceHistory.entity");
const users_repository_1 = require("./modules/users/users.repository");
const guards_guard_1 = require("./guards/guards.guard");
const pdf_module_1 = require("./modules/pdfs/pdf.module");
const config_1 = require("@nestjs/config");
const user_devices_entity_1 = require("./modules/UserDevices/entities/user_devices.entity");
const appUser_entity_1 = require("./modules/users/entities/appUser.entity");
const osInfo_module_1 = require("./modules/osInfo/osInfo.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
            typeorm_1.TypeOrmModule.forRootAsync({
                name: "default",
                useFactory: async () => {
                    return (0, db_config_1.dbConfig)();
                }
            }),
            devices_module_1.DevicesModule,
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            pdf_module_1.PdfModule,
            osInfo_module_1.OSInfoModule,
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, device_entity_1.Device, deviceHistory_entity_1.DeviceUsageHistory, user_devices_entity_1.UsersAssets, appUser_entity_1.AppUser])
        ],
        controllers: [app_controller_1.AppController],
        providers: [{ provide: core_1.APP_INTERCEPTOR, useClass: transform_interceptor_1.TransformInterceptor }, app_service_1.AppService, { provide: "IUserRepository", useClass: users_repository_1.UserRepository },
            { provide: core_1.APP_GUARD, useClass: guards_guard_1.GuardsGuard }
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map