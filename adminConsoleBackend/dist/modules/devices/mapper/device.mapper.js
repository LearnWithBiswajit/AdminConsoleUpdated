"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceMapper = void 0;
const device_dto_1 = require("../dto/device.dto");
const device_entity_1 = require("../entities/device.entity");
const osInfo_entity_1 = require("../../osInfo/entities/osInfo.entity");
const osInfo_dto_1 = require("../../osInfo/dtos/osInfo.dto");
class DeviceMapper {
    static mapToEntity(deviceDto) {
        let deviceEntity = new device_entity_1.Device();
        let osInfo = new osInfo_entity_1.OSInfo();
        deviceDto.id ? deviceEntity.id = deviceDto.id : undefined;
        deviceDto.osId ? deviceEntity.osId = deviceDto.osId : null;
        deviceDto.deviceType ? deviceEntity.deviceType = deviceDto.deviceType : null;
        deviceDto.deviceStatus ? deviceEntity.deviceStatus = deviceDto.deviceStatus : null;
        deviceDto.macAddress ? deviceEntity.macAddress = deviceDto.macAddress : null;
        deviceDto.hostName ? deviceEntity.hostName = deviceDto.hostName : null;
        deviceDto.serialNumber ? deviceEntity.serialNumber = deviceDto.serialNumber : null;
        deviceDto.brand ? deviceEntity.brand = deviceDto.brand : null;
        return deviceEntity;
    }
    static mapToDto(deviceEntity) {
        let deviceDto = new device_dto_1.DeviceDTO();
        let osInfoDto = new osInfo_dto_1.OSInfoDto();
        deviceDto.id = deviceEntity.id;
        osInfoDto.osType = deviceEntity.osType;
        deviceDto.deviceType = deviceEntity.deviceType;
        deviceDto.deviceStatus = deviceEntity.deviceStatus;
        deviceDto.macAddress = deviceEntity.macAddress;
        deviceDto.hostName = deviceEntity.hostName;
        deviceDto.serialNumber = deviceEntity.serialNumber;
        deviceDto.brand = deviceEntity.brand;
        osInfoDto.osVersion = deviceEntity.osVersion;
        deviceDto["bitlockerId"] = deviceEntity.bitlockerId;
        deviceDto["recoveryKey"] = deviceEntity.recoveryKey;
        osInfoDto.osName = deviceEntity.osName;
        return { ...deviceDto, ...osInfoDto };
    }
    static mapToDeviceDto(deviceEntity) {
        let deviceDto = new device_dto_1.DeviceDTO();
        let osInfoDto = new osInfo_dto_1.OSInfoDto();
        deviceDto.id = deviceEntity.id;
        osInfoDto.osId = deviceEntity.osId;
        deviceDto.deviceType = deviceEntity.deviceType;
        deviceDto.deviceStatus = deviceEntity.deviceStatus;
        deviceDto.macAddress = deviceEntity.macAddress;
        deviceDto.hostName = deviceEntity.hostName;
        deviceDto.serialNumber = deviceEntity.serialNumber;
        deviceDto.brand = deviceEntity.brand;
        deviceDto["bitlockerId"] = deviceEntity.bitlockerId;
        deviceDto["recoveryKey"] = deviceEntity.recoveryKey;
        return { ...deviceDto, ...osInfoDto };
    }
    static mapToInventory(res) {
        let inventoryDto = new device_dto_1.Inventory();
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
        return inventoryDto;
    }
}
exports.DeviceMapper = DeviceMapper;
//# sourceMappingURL=device.mapper.js.map