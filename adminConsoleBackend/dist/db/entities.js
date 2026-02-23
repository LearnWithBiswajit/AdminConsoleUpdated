"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbEntities = void 0;
const device_entity_1 = require("../modules/devices/entities/device.entity");
const deviceHistory_entity_1 = require("../modules/devices/entities/deviceHistory.entity");
const osInfo_entity_1 = require("../modules/osInfo/entities/osInfo.entity");
const user_devices_entity_1 = require("../modules/UserDevices/entities/user_devices.entity");
const appUser_entity_1 = require("../modules/users/entities/appUser.entity");
const user_entity_1 = require("../modules/users/entities/user.entity");
exports.dbEntities = [device_entity_1.Device, user_entity_1.User, deviceHistory_entity_1.DeviceUsageHistory, user_devices_entity_1.UsersAssets, osInfo_entity_1.OSInfo, appUser_entity_1.AppUser];
//# sourceMappingURL=entities.js.map