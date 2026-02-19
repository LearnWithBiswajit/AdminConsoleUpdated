import { Device } from "src/modules/devices/entities/device.entity";
import { Inventory, User_Device, UserToDevice } from "../dto/userAssignedToDevice.dto";
import { User } from "src/modules/users/entities/user.entity";
import { UUID } from "crypto";
import { UsersAssets } from "../entities/user_devices.entity";
import { OSInfoDto } from "src/modules/osInfo/dtos/osInfo.dto";
import { OSInfo } from "src/modules/osInfo/entities/osInfo.entity";

export class UserDeviceMapper {

    public static mapToEntity(userId, deviceId): UsersAssets {
        let usersAssets = new UsersAssets();
        userId ? usersAssets.userId = userId : undefined;
        deviceId ? usersAssets.deviceId = deviceId : undefined;
        return usersAssets;
    }

    public static mapTodto(asset: UsersAssets): User_Device {
        let users = new User_Device();
        asset.assetId ? users.id = asset.assetId as UUID : undefined;
        asset.userId ? users.userId = asset.userId as UUID : undefined;
        asset.deviceId ? users.deviceId = asset.deviceId as UUID : undefined;
        return users;
    }

    public static mapToInventory(res: Device & User & UsersAssets & OSInfo): Inventory {
        let inventoryDto = new Inventory();
        let osInfoDto = new OSInfoDto()
        res.id ? inventoryDto.id = res.id as UUID : null;
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
        return {...inventoryDto, ...osInfoDto};
    }

    public static mapToBitLocker(res:Device&User&UsersAssets&OSInfo):Inventory{
            let inventoryDto=new Inventory();
            let osInfoDto = new OSInfoDto();
            res.id?inventoryDto.id=res.id as UUID:null;
            res.firstName?inventoryDto.name=res.firstName+(res.middleName ? ` ${res.middleName}` : "")+(res.lastName ? ` ${res.lastName}` : ""):"";
            res.email?inventoryDto.email=res.email:"";
            res.deviceStatus? inventoryDto.deviceStatus=res.deviceStatus:null;
            res.deviceType?inventoryDto.deviceType=res.deviceType:null;
            res.macAddress?inventoryDto.macAddress=res.macAddress:null;
            res.hostName?inventoryDto.hostName=res.hostName:null;
            res.osType?osInfoDto.osType=res.osType:null;
            res.serialNumber?inventoryDto.serialNumber=res.serialNumber:null;
            res.brand?inventoryDto.brand=res.brand:null;
            res.assetId ? inventoryDto.assetId = res.assetId : null;
            inventoryDto.bitlockerId = res.bitlockerId ? res.bitlockerId : "";
            inventoryDto.recoveryKey = res.recoveryKey ? res.recoveryKey : "";
            res.userId? inventoryDto.userId=res.userId:null;
            return inventoryDto;
        }
}
