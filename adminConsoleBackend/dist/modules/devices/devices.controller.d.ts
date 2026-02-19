import { IDevicesService } from './interfaces/device.interface';
import { BitLockerAndRecovaryKey, DeviceCount, DeviceDTO, Inventory, QueryDevices } from './dto/device.dto';
import { UpdateDeviceDTO } from './dto/updateDevice.dto';
import { DeviceStatus, DeviceType, OSType } from 'src/config/enum.config';
import { UUID } from 'crypto';
export declare class DevicesController {
    private readonly devicesService;
    constructor(devicesService: IDevicesService);
    logger: any;
    getAllDevices(context: any, query: QueryDevices): Promise<Record<string, object>>;
    createDevice(deviceDto: DeviceDTO): Promise<DeviceDTO>;
    updateDeviceStatus(updateDeviceDTO: UpdateDeviceDTO): Promise<Record<string, string>>;
    countByStatusAndDeviceType(deviceStatus: DeviceStatus, deviceType: DeviceType, osType: OSType): Promise<DeviceCount[] | number>;
    getInventory(page: number, limit: number, searchString: string): Promise<Record<string, Inventory[] | number>>;
    deleteDevice(deviceId: UUID): Promise<object>;
    editDevice(updatedDevice: DeviceDTO): unknown;
    addBitLockerKey(info: BitLockerAndRecovaryKey): Promise<any>;
}
