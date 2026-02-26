import { Injectable, Logger } from "@nestjs/common";
import { IOSInfoRepository } from "./Interfaces/osInfo.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { OSInfo } from "./entities/osInfo.entity";
import { Repository } from "typeorm";
import { OSType } from "src/config/enum.config";

@Injectable()
export class OSInfoRepository implements IOSInfoRepository{
    constructor(@InjectRepository(OSInfo) private readonly osInfoRepository:Repository<OSInfo>){}
    logger=new Logger();


    public async getAll(): Promise<OSInfo[]> {
        try {
            this.logger.log(`Execution Started to get all active OS Versions`);
            let res:OSInfo[] = await this.osInfoRepository.find({where:{isActive:true}});
            this.logger.log(`Execution Completed to get all active OS Versions`);
            return Promise.resolve(res);
        } catch (error) {
            this.logger.error(error);
            return Promise.reject(error);
        }
    }

    public async getOsInfoByVersion(version: string, osType:OSType): Promise<OSInfo> {
        try {
            this.logger.log(`Execution started to get os information by osVersion: ${version}`);
            let res:OSInfo = await this.osInfoRepository.findOneOrFail({where:{osVersion:version, osType:osType}});4
            this.logger.log(`Execution completed to get os information by osVersion: ${version}`);
            return Promise.resolve(res);

        } catch (error) {
            this.logger.error("This error occurred in OSInfoRepository. MethodName: getOsInfoByVersion", error);
            return Promise.reject(error);
        }
    }
    
}