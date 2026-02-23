import { UUID } from "crypto";
import { BrandName, DeviceStatus, DeviceType, OSType } from "src/config/enum.config";
export declare class DeviceDTO {
    id: UUID;
    osType: OSType;
    deviceType: DeviceType;
    deviceStatus: DeviceStatus;
    userId: string;
    macAddress: string[];
    hostName: string;
    serialNumber: string;
    brand: BrandName;
    osVersion: string;
}
declare const DeviceCount_base: any;
export declare class DeviceCount extends DeviceCount_base {
    count: number;
}
declare const QueryDevices_base: any;
export declare class QueryDevices extends QueryDevices_base {
    page: number;
    limit: number;
    osType: OSType;
    searchString: string;
    deviceType: DeviceType;
}
export declare class Inventory extends DeviceDTO {
    name: string;
    email: string;
}
declare const AssigndeviceDTO_base: any;
export declare class AssigndeviceDTO extends AssigndeviceDTO_base {
    deviceIds: UUID[];
}
declare const BitLockerAndRecovaryKey_base: any;
export declare class BitLockerAndRecovaryKey extends BitLockerAndRecovaryKey_base {
    bitlockerId: string;
    recoveryKey: string;
}
export declare class DevicesInfo extends DeviceDTO {
    bitlockerId: string;
    recoveryKey: string;
}
export {};
