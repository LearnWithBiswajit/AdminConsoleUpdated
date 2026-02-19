import { IDeviceRepository, IDevicesService } from './interfaces/device.interface';
import { BitLockerAndRecovaryKey, DeviceCount, DeviceDTO, Inventory, QueryDevices } from './dto/device.dto';
import { UpdateDeviceDTO } from './dto/updateDevice.dto';
import { DeviceStatus, DeviceType, OSType } from 'src/config/enum.config';
import { UUID } from 'crypto';
export declare class DeviceService implements IDevicesService {
    private readonly deviceRepository;
    constructor(deviceRepository: IDeviceRepository);
    logger: any;
    allDevices(query: QueryDevices): Promise<Record<string, object>>;
    createDevice(deviceDto: DeviceDTO): Promise<DeviceDTO>;
    updateDeviceStatus(updateDeviceDTO: UpdateDeviceDTO, deviceIds?: UUID[]): Promise<Record<string, string>>;
    findTotalCountByStatusAndDeviceType(deviceStatus: DeviceStatus, deviceType: DeviceType, osType: OSType): Promise<DeviceCount[] | number>;
    getInventory(page: number, limit: number, searchString?: string): Promise<Record<string, Inventory[] | number>>;
    deleteDeviceById(deviceId: UUID): Promise<string>;
    updateDevice(body: DeviceDTO): Promise<DeviceDTO>;
    markAsDeadDevice(deviceId: UUID): Promise<number>;
    addBitlockerKey(info: BitLockerAndRecovaryKey): Promise<string>;
}
