import { BrandName, DeviceStatus, DeviceType } from "src/config/enum.config";
export declare class Device {
    id: string;
    osId: string;
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
