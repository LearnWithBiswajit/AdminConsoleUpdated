import { DeviceStatus, DeviceType, OSType } from "src/config/enum.config";
import { BitLockerAndRecovaryKey, DeviceCount, DeviceDTO, Inventory, QueryDevices } from "../dto/device.dto";
import { UpdateDeviceDTO } from "../dto/updateDevice.dto";
import { Device } from "../entities/device.entity";
import { UUID } from "crypto";
import { DeviceUsageHistory } from "../entities/deviceHistory.entity";
import { User } from "src/modules/users/entities/user.entity";
import { OSInfo } from "src/modules/osInfo/entities/osInfo.entity";

export interface IDeviceRepository {
    findAllDevices(query: QueryDevices): Promise<Device[]&OSInfo[]>;
    insertDevice(deviceEntity: Device): Promise<Device>;
    updateDeviceStatus(updateDeviceEntity: Device, deviceIds?: UUID[]): Promise<number>;
    findTotalCountByStatusAndDeviceType(deviceStatus: DeviceStatus, deviceType: DeviceType, osType: OSType, flag?: boolean, searchString?: string): Promise<DeviceCount[] | number>;
    // deleteDevicesByUserId(userId: UUID): Promise<number>;
    insertDeviceHistory(deviceInfo: DeviceUsageHistory[]): Promise<any>;
    // getAssignedDevicesToUser(userId: UUID): Promise<Device[]>;
    // allocateDevice(userId: UUID, deviceId: UUID[]): Promise<any>;
    getInventory(page: number, limit: number, searchString?: string): Promise<(Device & User & OSInfo)[]>;
    getInventoryCount(searchString?: string): Promise<{ TotalCount: number }>;
    deleteDevice(deviceId: UUID): Promise<number>;
    getDeviceById(id: UUID): Promise<Device>;
    updateDevice(body: Device): Promise<Device>;
    markAsDeadDevice(deviceId:UUID):Promise<number>;
    addBitlockerKey(info:BitLockerAndRecovaryKey):Promise<number>;
    getDeviceInfoByHostOrSerial(serialNumber:string, hostName:string):Promise<Device | null>;
    // bitlockerByDeviceId(deviceId:UUID):Promise<Device|null>;
}

export interface IDevicesService {
    allDevices(query: QueryDevices): Promise<Record<string, object>>;
    createDevice(deviceDto: DeviceDTO): Promise<DeviceDTO>;
    updateDeviceStatus(updateDeviceDTO: UpdateDeviceDTO, deviceIds?: UUID[]): Promise<Record<string, string>>;
    findTotalCountByStatusAndDeviceType(deviceStatus: DeviceStatus, deviceType: DeviceType, osType: OSType): Promise<DeviceCount[] | number>;
    // deleteDevicesByUserId(userId: UUID): Promise<Record<string, number>>;
    // getAssignedDevicesToUser(userId: UUID): Promise<DeviceDTO[]>;
    // assignDevice(userId: UUID, deviceIds: UUID[]): Promise<any>;
    getInventory(page: number, limit: number, searchString?: string): Promise<Record<string, Inventory[] | number>>
    deleteDeviceById(deviceId: UUID): Promise<string>;
    updateDevice(body: DeviceDTO): Promise<DeviceDTO>;
    markAsDeadDevice(deviceId:UUID):Promise<number>;
    addBitlockerKey(info:BitLockerAndRecovaryKey):Promise<string>;
}