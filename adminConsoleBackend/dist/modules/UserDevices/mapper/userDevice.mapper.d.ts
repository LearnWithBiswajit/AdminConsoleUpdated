import { Device } from "src/modules/devices/entities/device.entity";
import { Inventory, User_Device } from "../dto/userAssignedToDevice.dto";
import { User } from "src/modules/users/entities/user.entity";
import { UsersAssets } from "../entities/user_devices.entity";
import { OSInfo } from "src/modules/osInfo/entities/osInfo.entity";
export declare class UserDeviceMapper {
    static mapToEntity(userId: any, deviceId: any): UsersAssets;
    static mapTodto(asset: UsersAssets): User_Device;
    static mapToInventory(res: Device & User & UsersAssets & OSInfo): Inventory;
    static mapToBitLocker(res: Device & User & UsersAssets & OSInfo): Inventory;
}
