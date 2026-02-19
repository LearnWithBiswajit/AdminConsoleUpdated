import { UUID } from "crypto";
import { DeviceDTO } from "src/modules/devices/dto/device.dto";
export declare class UserToDevice {
    id: UUID;
    userId: UUID;
    deviceIds: UUID[];
}
export declare class User_Device extends UserToDevice {
    deviceId: UUID;
}
export declare class Inventory extends DeviceDTO {
    name: string;
    email: string;
    assetId: string;
    bitlockerId: string;
    recoveryKey: string;
}
