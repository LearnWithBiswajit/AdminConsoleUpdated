import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OSInfo } from "./entities/osInfo.entity";

@Module({
    imports:[TypeOrmModule.forFeature([OSInfo])]
})
export class OSInfoModule {}