import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OSInfo } from "./entities/osInfo.entity";
import { OSInfoController } from "./osInfo.controller";
import { OSInfoService } from "./osInfo.service";
import { OSInfoRepository } from "./osInfo.repository";

@Module({
    imports:[TypeOrmModule.forFeature([OSInfo])],
    controllers:[OSInfoController],
    providers:[{provide:"IOSInfoService", useClass:OSInfoService}, {provide:"IOSInfoRepository", useClass:OSInfoRepository}],
    exports:["IOSInfoService"]
})
export class OSInfoModule {}