import { DeviceDTO, Inventory } from '../dto/device.dto';
import { Device } from "../entities/device.entity";
import { User } from "src/modules/users/entities/user.entity";
export declare class DeviceMapper {
    static mapToEntity(deviceDto: Partial<DeviceDTO>): Device;
    static mapToDto(deviceEntity: Device): DeviceDTO;
    static mapToInventory(res: Device & User): Inventory;
}
