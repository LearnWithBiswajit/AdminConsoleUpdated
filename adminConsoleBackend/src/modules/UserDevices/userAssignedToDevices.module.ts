import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersAssets } from "./entities/user_devices.entity";
import { UsersDevicesController } from "./userAssignedToUser.controller";
import { UserDevicesService } from "./userAssignedToUser.service";
import { UsersDevicesRepository } from "./userAssignedToUser.repository";
import { Device } from "../devices/entities/device.entity";
import { User } from "../users/entities/user.entity";
import { DeviceService } from "../devices/devices.service";
import { DevicesModule } from "../devices/devices.module";
import { DeviceRepository } from "../devices/devices.repository";
import { DeviceUsageHistory } from "../devices/entities/deviceHistory.entity";

@Module({
imports:[TypeOrmModule.forFeature([UsersAssets, Device, User, DeviceUsageHistory]), DevicesModule],
controllers:[UsersDevicesController],
providers:[{provide:"IUserDevicesService", useClass: UserDevicesService},{provide:"IUsersDevicesRepository", useClass: UsersDevicesRepository}, {provide:"IDevicesService", useClass:DeviceService}, {provide:"IDeviceRepository", useClass:DeviceRepository}],
exports:[UserDeviceMapper, {provide:"IUsersDevicesRepository", useClass:UsersDevicesRepository},]
})
export class UserDeviceMapper{}