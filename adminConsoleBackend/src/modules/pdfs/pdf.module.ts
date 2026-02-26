import { Module } from '@nestjs/common';
import { PdfContoller } from './pdf.controller';
import { PdfService } from './pdf.service';
import { Device } from '../devices/entities/device.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceRepository } from '../devices/devices.repository';
import { DeviceUsageHistory } from '../devices/entities/deviceHistory.entity';
import { OSInfo } from '../osInfo/entities/osInfo.entity';
import { DevicesModule } from '../devices/devices.module';

@Module({
    imports: [TypeOrmModule.forFeature([Device, DeviceUsageHistory]), DevicesModule],
    controllers: [PdfContoller],
    providers: [{ provide: "IPdfServices", useClass: PdfService }, { provide: "IDeviceRepository", useClass: DeviceRepository }],
    exports: [{ provide: "IPdfServices", useClass: PdfService }]
})
export class PdfModule { }
