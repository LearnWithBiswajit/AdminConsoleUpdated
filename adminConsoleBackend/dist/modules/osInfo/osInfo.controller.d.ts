import { IOSInfoService } from "./Interfaces/osInfo.interface";
import { OSInfoDto } from "./dtos/osInfo.dto";
export declare class OSInfoController {
    private readonly osService;
    constructor(osService: IOSInfoService);
    logger: any;
    allOsInfo(): Promise<OSInfoDto[]>;
}
