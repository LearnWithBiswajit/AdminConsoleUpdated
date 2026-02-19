import { Device } from "../devices/entities/device.entity";
import { User } from "../users/entities/user.entity";
import { IUsersDevicesRepository } from "./interface/userAssignedToDevices.interface";
import { Repository } from 'typeorm';
import { UsersAssets } from "./entities/user_devices.entity";
import { UUID } from "crypto";
export declare class UsersDevicesRepository implements IUsersDevicesRepository {
    private readonly deviceRepo;
    private readonly userRepo;
    private readonly assetRepo;
    constructor(deviceRepo: Repository<Device>, userRepo: Repository<User>, assetRepo: Repository<UsersAssets>);
    logger: any;
    getInventory(page: number, limit: number, searchString?: string): Promise<(Device & User & UsersAssets)[]>;
    getInventoryCount(searchString?: string): Promise<{
        TotalCount: number;
    }>;
    allocateDevice(body: UsersAssets[]): Promise<UsersAssets[]>;
    getDevicesByUserId(userId: string): Promise<string[]>;
    assetsWithdrawal(userId: string): Promise<any>;
    findAndUpdate(device: string[]): Promise<any>;
    deleteUserFromDevice(assetId: UUID): Promise<Record<string, any>>;
    getUsersByDeviceId(deviceId: UUID): Promise<UsersAssets[]>;
    getInfoOfDevicesAndUser(page: number, limit: number, searchString?: string): Promise<(Device & User & UsersAssets)[]>;
    getInfoOfDevicesAndUserCount(searchString?: string): Promise<{
        TotalCount: number;
    }>;
}
