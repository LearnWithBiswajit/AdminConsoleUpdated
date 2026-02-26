import { Module } from '@nestjs/common';
import { DeviceService } from './devices.service';
import { DevicesController } from './devices.controller';
import { DeviceRepository } from './devices.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Device } from './entities/device.entity';
import { DeviceUsageHistory } from './entities/deviceHistory.entity';
import { OSInfo } from '../osInfo/entities/osInfo.entity';
import { OSInfoModule } from '../osInfo/osInfo.module';

@Module({
  imports:[TypeOrmModule.forFeature([Device, DeviceUsageHistory, OSInfo]), OSInfoModule],
  controllers: [DevicesController],
  providers: [{provide:"IDevicesService", useClass:DeviceService}, {provide:"IDeviceRepository", useClass:DeviceRepository}],
  exports:["IDevicesService","IDeviceRepository", TypeOrmModule.forFeature([OSInfo])]
})
export class DevicesModule {}
 