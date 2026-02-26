import { BrandName, DeviceStatus, DeviceType, OSType } from "src/config/enum.config";
export declare class DeviceUsageHistory {
    id: string;
    osType: OSType;
    deviceType: DeviceType;
    deviceStatus: DeviceStatus;
    userId: string;
    macAddress: string[];
    hostName: string;
    serialNumber: string;
    brand: BrandName;
}
