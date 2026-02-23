import { IOSInfoRepository, IOSInfoService } from "./Interfaces/osInfo.interface";
import { OSInfoDto } from "./dtos/osInfo.dto";
import { OSType } from "src/config/enum.config";
export declare class OSInfoService implements IOSInfoService {
    private readonly osInfoRepository;
    constructor(osInfoRepository: IOSInfoRepository);
    logger: any;
    allOSInfo(): Promise<OSInfoDto[]>;
    osInfoByVersion(version: string, osType: OSType): Promise<OSInfoDto>;
}
