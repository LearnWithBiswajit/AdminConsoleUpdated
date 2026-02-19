import { Device } from "src/modules/devices/entities/device.entity";
import { Inventory, UserToDevice } from "../dto/userAssignedToDevice.dto";
import { User } from "src/modules/users/entities/user.entity";
import { UUID } from "crypto";
import { UsersAssets } from "../entities/user_devices.entity";
export interface IUserDevicesService {
    getInventory(page: number, limit: number, searchString?: string): Promise<Record<string, Inventory[] | number>>;
    assignDevice(body: UserToDevice): Promise<UserToDevice[]>;
    deleteAssignedDevicesOfUser(userId: UUID): Promise<any>;
    releaseUserFromDevice(assetId: UUID): Promise<Record<string, string>>;
    getInfoOfDevicesAndUser(page: number, limit: number, searchString?: string): Promise<Record<string, Inventory[] | number>>;
}
export interface IUsersDevicesRepository {
    getInventory(page: number, limit: number, searchString?: string): Promise<(Device & User & UsersAssets)[]>;
    allocateDevice(body: UsersAssets[]): Promise<UsersAssets[]>;
    getInventoryCount(searchString?: string): Promise<{
        TotalCount: number;
    }>;
    getDevicesByUserId(userId: string): Promise<string[]>;
    assetsWithdrawal(devices: string): Promise<any>;
    findAndUpdate(device: string[]): Promise<any>;
    deleteUserFromDevice(assetId: UUID): Promise<Record<string, any>>;
    getUsersByDeviceId(deviceId: UUID): Promise<UsersAssets[]>;
    getInfoOfDevicesAndUser(page: number, limit: number, searchString?: string): Promise<(Device & User & UsersAssets)[]>;
    getInfoOfDevicesAndUserCount(searchString?: string): Promise<{
        TotalCount: number;
    }>;
}
