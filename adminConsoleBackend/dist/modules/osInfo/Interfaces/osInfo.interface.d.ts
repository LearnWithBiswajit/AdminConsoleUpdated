import { OSType } from "src/config/enum.config";
import { OSInfoDto } from "../dtos/osInfo.dto";
import { OSInfo } from "../entities/osInfo.entity";
export interface IOSInfoRepository {
    getAll(): Promise<OSInfo[]>;
    getOsInfoByVersion(version: string, osType: OSType): Promise<OSInfo>;
}
export interface IOSInfoService {
    allOSInfo(): Promise<OSInfoDto[]>;
    osInfoByVersion(version: string, osType: OSType): Promise<OSInfoDto>;
}
