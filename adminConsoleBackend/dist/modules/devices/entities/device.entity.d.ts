import { BrandName, DeviceStatus, DeviceType, OSType } from "src/config/enum.config";
export declare class Device {
    id: string;
    osType: OSType;
    deviceType: DeviceType;
    deviceStatus: DeviceStatus;
    macAddress: string[];
    hostName: string;
    serialNumber: string;
    brand: BrandName;
    isDeleted: boolean;
    bitlockerId: string;
    recoveryKey: string;
}
