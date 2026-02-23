import { IOSInfoRepository } from "./Interfaces/osInfo.interface";
import { OSInfo } from "./entities/osInfo.entity";
import { Repository } from "typeorm";
import { OSType } from "src/config/enum.config";
export declare class OSInfoRepository implements IOSInfoRepository {
    private readonly osInfoRepository;
    constructor(osInfoRepository: Repository<OSInfo>);
    logger: any;
    getAll(): Promise<OSInfo[]>;
    getOsInfoByVersion(version: string, osType: OSType): Promise<OSInfo>;
}
