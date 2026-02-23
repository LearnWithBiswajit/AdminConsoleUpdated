import { Inject, Injectable, Logger } from "@nestjs/common";
import { IOSInfoRepository, IOSInfoService } from "./Interfaces/osInfo.interface";
import { OSInfoDto } from "./dtos/osInfo.dto";
import { OSInfo } from "./entities/osInfo.entity";
import { OSMapper } from "./mapper/osInfo.mapper";
import { OSType } from "src/config/enum.config";

@Injectable()
export class OSInfoService implements IOSInfoService{
    constructor(@Inject("IOSInfoRepository") private readonly osInfoRepository:IOSInfoRepository){}
    logger = new Logger();

    public async allOSInfo(): Promise<OSInfoDto[]> {
        try {
            let allOS:OSInfo[] = await this.osInfoRepository.getAll();
            let res:OSInfoDto[] = allOS.map((os:OSInfo):OSInfoDto=>OSMapper.mapToDto(os));
            return Promise.resolve(res);
        } catch (error) {
            this.logger.error("This error occurred in osInfoService. Method Name: allOSInfo", error);
            return Promise.reject(error);
        }
    }

    public async osInfoByVersion(version: string, osType: OSType): Promise<OSInfoDto> {
        try {
            let osInfo:OSInfo = await this.osInfoRepository.getOsInfoByVersion(version, osType);
            let res:OSInfoDto = OSMapper.mapToDto(osInfo);
            return Promise.resolve(res);
        } catch (error) {
            this.logger.error("This error occurred in OSInfoService. Method Name: osInfoByVersion", error);
            return Promise.reject(error);
        }
    }
}