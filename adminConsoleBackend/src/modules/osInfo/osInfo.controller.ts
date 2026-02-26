import { Controller, Get, Inject, Logger } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { IOSInfoService } from "./Interfaces/osInfo.interface";
import { OSInfoDto } from "./dtos/osInfo.dto";

@ApiTags("OS Info")
@Controller("osinfo")
export class OSInfoController{
    constructor(@Inject("IOSInfoService") private readonly osService:IOSInfoService){}
    logger = new Logger();

    @Get()
    public async allOsInfo():Promise<OSInfoDto[]>{
        try {
            return Promise.resolve(this.osService.allOSInfo());
        } catch (error) {
            this.logger.error("This error occurred in OSInfoController. MethodName:allOsInfo", error);
            return Promise.reject(error);
        }
    }
}