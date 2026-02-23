"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDeviceMapper = void 0;
const userAssignedToDevice_dto_1 = require("../dto/userAssignedToDevice.dto");
const user_devices_entity_1 = require("../entities/user_devices.entity");
const osInfo_dto_1 = require("../../osInfo/dtos/osInfo.dto");
class UserDeviceMapper {
    static mapToEntity(userId, deviceId) {
        let usersAssets = new user_devices_entity_1.UsersAssets();
        userId ? usersAssets.userId = userId : undefined;
        deviceId ? usersAssets.deviceId = deviceId : undefined;
        return usersAssets;
    }
    static mapTodto(asset) {
        let users = new userAssignedToDevice_dto_1.User_Device();
        asset.assetId ? users.id = asset.assetId : undefined;
        asset.userId ? users.userId = asset.userId : undefined;
        asset.deviceId ? users.deviceId = asset.deviceId : undefined;
        return users;
    }
    static mapToInventory(res) {
        let inventoryDto = new userAssignedToDevice_dto_1.Inventory();
        let osInfoDto = new osInfo_dto_1.OSInfoDto();
        res.id ? inventoryDto.id = res.id : null;
        res.firstName ? inventoryDto.name = res.firstName + (res.middleName ? ` ${res.middleName}` : "") + (res.lastName ? ` ${res.lastName}` : "") : null;
        res.email ? inventoryDto.email = res.email : null;
        res.deviceStatus ? inventoryDto.deviceStatus = res.deviceStatus : null;
        res.deviceType ? inventoryDto.deviceType = res.deviceType : null;
        res.macAddress ? inventoryDto.macAddress = res.macAddress : null;
        res.hostName ? inventoryDto.hostName = res.hostName : null;
        res.osType ? osInfoDto.osType = res.osType : null;
        res.serialNumber ? inventoryDto.serialNumber = res.serialNumber : null;
        res.brand ? inventoryDto.brand = res.brand : null;
        res.assetId ? inventoryDto.assetId = res.assetId : null;
        res.osVersion ? osInfoDto.osVersion = res.osVersion : null;
        res.osName ? osInfoDto.osName = res.osName : null;
        return { ...inventoryDto, ...osInfoDto };
    }
    static mapToBitLocker(res) {
        let inventoryDto = new userAssignedToDevice_dto_1.Inventory();
        let osInfoDto = new osInfo_dto_1.OSInfoDto();
        res.id ? inventoryDto.id = res.id : null;
        res.firstName ? inventoryDto.name = res.firstName + (res.middleName ? ` ${res.middleName}` : "") + (res.lastName ? ` ${res.lastName}` : "") : "";
        res.email ? inventoryDto.email = res.email : "";
        res.deviceStatus ? inventoryDto.deviceStatus = res.deviceStatus : null;
        res.deviceType ? inventoryDto.deviceType = res.deviceType : null;
        res.macAddress ? inventoryDto.macAddress = res.macAddress : null;
        res.hostName ? inventoryDto.hostName = res.hostName : null;
        res.osType ? osInfoDto.osType = res.osType : null;
        res.serialNumber ? inventoryDto.serialNumber = res.serialNumber : null;
        res.brand ? inventoryDto.brand = res.brand : null;
        res.assetId ? inventoryDto.assetId = res.assetId : null;
        inventoryDto.bitlockerId = res.bitlockerId ? res.bitlockerId : "";
        inventoryDto.recoveryKey = res.recoveryKey ? res.recoveryKey : "";
        res.userId ? inventoryDto.userId = res.userId : null;
        return inventoryDto;
    }
}
exports.UserDeviceMapper = UserDeviceMapper;
//# sourceMappingURL=userDevice.mapper.js.map