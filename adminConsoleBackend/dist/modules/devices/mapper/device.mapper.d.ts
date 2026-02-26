import { DeviceDTO, Inventory } from '../dto/device.dto';
import { Device } from "../entities/device.entity";
import { User } from "src/modules/users/entities/user.entity";
import { OSInfo } from "src/modules/osInfo/entities/osInfo.entity";
import { OSInfoDto } from "src/modules/osInfo/dtos/osInfo.dto";
export declare class DeviceMapper {
    static mapToEntity(deviceDto: Partial<DeviceDTO> & Partial<OSInfoDto>): Device;
    static mapToDto(deviceEntity: Device & OSInfo): DeviceDTO & OSInfoDto;
    static mapToDeviceDto(deviceEntity: Device): DeviceDTO & OSInfoDto;
    static mapToInventory(res: Device & User & OSInfoDto): Inventory;
}
