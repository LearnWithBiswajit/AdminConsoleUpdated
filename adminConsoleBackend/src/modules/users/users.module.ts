import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DevicesModule } from '../devices/devices.module';
import { DeviceService } from '../devices/devices.service';
import { DeviceRepository } from '../devices/devices.repository';
import { Device } from '../devices/entities/device.entity';
import { DeviceUsageHistory } from '../devices/entities/deviceHistory.entity';
import { UserDevicesService } from '../UserDevices/userAssignedToUser.service';
import { UserDeviceMapper } from '../UserDevices/userAssignedToDevices.module';
import { AppUser } from './entities/appUser.entity';
import { OSInfoModule } from '../osInfo/osInfo.module';

@Module({
  imports:[TypeOrmModule.forFeature([User, Device, DeviceUsageHistory, AppUser]), DevicesModule,UserDeviceMapper, OSInfoModule],
  controllers: [UsersController],
  providers: [{provide:"IUserService", useClass:UsersService},{provide:"IUserRepository", useClass:UserRepository},
    // {provide:"IDevicesService", useClass:DeviceService}, {provide:"IDeviceRepository", useClass:DeviceRepository},
    // {provide:"IUserDevicesService", useClass:UserDevicesService}
  ],
  exports:["IUserService", {provide:"IUserRepository", useClass:UserRepository},]
})
export class UsersModule {}
