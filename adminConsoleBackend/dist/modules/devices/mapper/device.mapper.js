"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceMapper = void 0;
const device_dto_1 = require("../dto/device.dto");
const device_entity_1 = require("../entities/device.entity");
class DeviceMapper {
    static mapToEntity(deviceDto) {
        let deviceEntity = new device_entity_1.Device();
        deviceDto.id ? deviceEntity.id = deviceDto.id : undefined;
        deviceDto.osType ? deviceEntity.osType = deviceDto.osType : null;
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
        deviceDto.id = deviceEntity.id;
        deviceDto.osType = deviceEntity.osType;
        deviceDto.deviceType = deviceEntity.deviceType;
        deviceDto.deviceStatus = deviceEntity.deviceStatus;
        deviceDto.macAddress = deviceEntity.macAddress;
        deviceDto.hostName = deviceEntity.hostName;
        deviceDto.serialNumber = deviceEntity.serialNumber;
        deviceDto.brand = deviceEntity.brand;
        deviceDto["bitlockerId"] = deviceEntity.bitlockerId;
        deviceDto["recoveryKey"] = deviceEntity.recoveryKey;
        return deviceDto;
    }
    static mapToInventory(res) {
        let inventoryDto = new device_dto_1.Inventory();
        res.id ? inventoryDto.id = res.id : null;
        res.firstName ? inventoryDto.name = res.firstName + (res.middleName ? ` ${res.middleName}` : "") + (res.lastName ? ` ${res.lastName}` : "") : null;
        res.email ? inventoryDto.email = res.email : null;
        res.deviceStatus ? inventoryDto.deviceStatus = res.deviceStatus : null;
        res.deviceType ? inventoryDto.deviceType = res.deviceType : null;
        res.macAddress ? inventoryDto.macAddress = res.macAddress : null;
        res.hostName ? inventoryDto.hostName = res.hostName : null;
        res.osType ? inventoryDto.osType = res.osType : null;
        res.serialNumber ? inventoryDto.serialNumber = res.serialNumber : null;
        res.brand ? inventoryDto.brand = res.brand : null;
        return inventoryDto;
    }
}
exports.DeviceMapper = DeviceMapper;
//# sourceMappingURL=device.mapper.js.map