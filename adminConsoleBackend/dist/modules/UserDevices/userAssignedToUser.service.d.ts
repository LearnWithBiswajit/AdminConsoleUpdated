import { IUserDevicesService, IUsersDevicesRepository } from "./interface/userAssignedToDevices.interface";
import { Inventory, UserToDevice } from "./dto/userAssignedToDevice.dto";
import { UUID } from "crypto";
import { IDevicesService } from '../devices/interfaces/device.interface';
export declare class UserDevicesService implements IUserDevicesService {
    private readonly usersDevicesRepository;
    private readonly deviceService;
    constructor(usersDevicesRepository: IUsersDevicesRepository, deviceService: IDevicesService);
    logger: any;
    getInventory(page: number, limit: number, searchString?: string): Promise<Record<string, Inventory[] | number>>;
    assignDevice(body: UserToDevice): Promise<UserToDevice[]>;
    deleteAssignedDevicesOfUser(userId: UUID): unknown;
    releaseUserFromDevice(assetId: UUID): Promise<Record<string, string>>;
    getInfoOfDevicesAndUser(page: number, limit: number, searchString?: string): Promise<Record<string, Inventory[] | number>>;
}
