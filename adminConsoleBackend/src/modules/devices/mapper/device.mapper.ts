import { UUID } from "crypto";
import { DeviceDTO, Inventory } from '../dto/device.dto';
import { Device } from "../entities/device.entity";
import { UserDTO } from "src/modules/users/dto/user.dto";
import { User } from "src/modules/users/entities/user.entity";
import { OSInfo } from "src/modules/osInfo/entities/osInfo.entity";
import { OSInfoDto } from "src/modules/osInfo/dtos/osInfo.dto";

export class DeviceMapper{
    public static mapToEntity(deviceDto:Partial<DeviceDTO>):Device{
        let deviceEntity = new Device();
        let osInfo = new OSInfo();

        deviceDto.id ? deviceEntity.id = deviceDto.id : undefined;
        deviceDto.osId ? deviceEntity.osId = deviceDto.osId : null;
        deviceDto.deviceType ? deviceEntity.deviceType = deviceDto.deviceType : null;
        // deviceDto.userId ? deviceEntity.userId = deviceDto.userId : null;
        deviceDto.deviceStatus ? deviceEntity.deviceStatus = deviceDto.deviceStatus : null;
        deviceDto.macAddress ? deviceEntity.macAddress = deviceDto.macAddress : null;
        deviceDto.hostName ? deviceEntity.hostName = deviceDto.hostName : null;
        deviceDto.serialNumber ? deviceEntity.serialNumber = deviceDto.serialNumber : null;
        deviceDto.brand ? deviceEntity.brand = deviceDto.brand : null;
        return deviceEntity;
    }

    public static mapToDto(deviceEntity:Device&OSInfo):DeviceDTO&OSInfoDto{
        let deviceDto = new DeviceDTO();
        let osInfoDto = new OSInfoDto();
        deviceDto.id = deviceEntity.id as UUID;
        osInfoDto.osType = deviceEntity.osType;
        deviceDto.deviceType = deviceEntity.deviceType;
        // deviceDto.userId = deviceEntity.userId;
        deviceDto.deviceStatus = deviceEntity.deviceStatus;
        deviceDto.macAddress = deviceEntity.macAddress;
        deviceDto.hostName = deviceEntity.hostName;
        deviceDto.serialNumber = deviceEntity.serialNumber;
        deviceDto.brand = deviceEntity.brand;
        osInfoDto.osVersion = deviceEntity.osVersion;
        deviceDto["bitlockerId"] = deviceEntity.bitlockerId;
        deviceDto["recoveryKey"] = deviceEntity.recoveryKey;
        osInfoDto.osName = deviceEntity.osName;
        return {...deviceDto, ...osInfoDto};
    }

    public static mapToDeviceDto(deviceEntity:Device):DeviceDTO{
        let deviceDto = new DeviceDTO();
        deviceDto.id = deviceEntity.id as UUID;
        deviceDto.osId = deviceEntity.osId;
        deviceDto.deviceType = deviceEntity.deviceType;
        // deviceDto.userId = deviceEntity.userId;
        deviceDto.deviceStatus = deviceEntity.deviceStatus;
        deviceDto.macAddress = deviceEntity.macAddress;
        deviceDto.hostName = deviceEntity.hostName;
        deviceDto.serialNumber = deviceEntity.serialNumber;
        deviceDto.brand = deviceEntity.brand;
        deviceDto["bitlockerId"] = deviceEntity.bitlockerId;
        deviceDto["recoveryKey"] = deviceEntity.recoveryKey;
        return deviceDto;
    }

    public static mapToInventory(res:Device&User&OSInfoDto):Inventory{
        let inventoryDto=new Inventory();
        let osInfoDto = new OSInfoDto();
        res.id?inventoryDto.id=res.id as UUID:null;
        res.firstName?inventoryDto.name=res.firstName+(res.middleName ? ` ${res.middleName}` : "")+(res.lastName ? ` ${res.lastName}` : ""):null;
        res.email?inventoryDto.email=res.email:null;
        res.deviceStatus? inventoryDto.deviceStatus=res.deviceStatus:null;
        res.deviceType?inventoryDto.deviceType=res.deviceType:null;
        res.macAddress?inventoryDto.macAddress=res.macAddress:null;
        res.hostName?inventoryDto.hostName=res.hostName:null;
        res.osType?osInfoDto.osType=res.osType:null;
        res.serialNumber?inventoryDto.serialNumber=res.serialNumber:null;
        res.brand?inventoryDto.brand=res.brand:null;
        return inventoryDto;
    }
}