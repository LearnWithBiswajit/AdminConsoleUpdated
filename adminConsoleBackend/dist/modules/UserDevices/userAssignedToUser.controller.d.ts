import { IUserDevicesService } from "./interface/userAssignedToDevices.interface";
import { Inventory, UserToDevice } from "./dto/userAssignedToDevice.dto";
import { UUID } from "crypto";
export declare class UsersDevicesController {
    private readonly usersDevicesServices;
    constructor(usersDevicesServices: IUserDevicesService);
    logger: any;
    getInventory(page: number, limit: number, searchString: string): Promise<Record<string, Inventory[] | number>>;
    assingDevice(body: UserToDevice): unknown;
    deleteAssignedDevicesOfUser(userId: UUID): unknown;
    releaseUser(assetId: UUID): Promise<object>;
    getInfoOfDevicesAndUser(page: number, limit: number, searchString: string): Promise<Record<string, Inventory[] | number>>;
}
