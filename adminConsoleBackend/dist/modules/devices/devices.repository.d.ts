import { Device } from "./entities/device.entity";
import { Repository } from "typeorm";
import { IDeviceRepository } from "./interfaces/device.interface";
import { DeviceStatus, DeviceType, OSType } from "src/config/enum.config";
import { BitLockerAndRecovaryKey, DeviceCount, QueryDevices } from "./dto/device.dto";
import { UUID } from "crypto";
import { DeviceUsageHistory } from "./entities/deviceHistory.entity";
import { User } from "../users/entities/user.entity";
import { OSInfo } from "../osInfo/entities/osInfo.entity";
export declare class DeviceRepository implements IDeviceRepository {
    private readonly deviceRepo;
    private readonly deviceHistoryRepo;
    private readonly osInfoRepo;
    constructor(deviceRepo: Repository<Device>, deviceHistoryRepo: Repository<DeviceUsageHistory>, osInfoRepo: Repository<OSInfo>);
    logger: any;
    findAllDevices(query: QueryDevices): Promise<Device[] & OSInfo[]>;
    insertDevice(deviceEntity: Device): Promise<Device>;
    updateDeviceStatus(updateDeviceEntity: Device, deviceIds?: UUID[]): Promise<number>;
    findTotalCountByStatusAndDeviceType(deviceStatus: DeviceStatus, deviceType: DeviceType, osType: OSType, flag?: boolean, searchString?: string): Promise<DeviceCount[] | number>;
    insertDeviceHistory(deviceInfo: DeviceUsageHistory[]): Promise<any>;
    getInventory(page: number, limit: number, searchString?: string): Promise<(Device & User & OSInfo)[]>;
    getInventoryCount(searchString?: string): Promise<{
        TotalCount: number;
    }>;
    deleteDevice(deviceId: UUID): Promise<number>;
    getDeviceById(id: UUID): Promise<Device>;
    updateDevice(body: Device): Promise<Device>;
    markAsDeadDevice(deviceId: UUID): Promise<number>;
    addBitlockerKey(info: BitLockerAndRecovaryKey): Promise<number>;
    getDeviceInfoByHostOrSerial(serialNumber: string, hostName: string): Promise<Device | null>;
}
