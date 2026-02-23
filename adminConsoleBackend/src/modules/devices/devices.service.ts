import { HttpException, Inject, Injectable, Logger, Param, Query } from '@nestjs/common';
import { IDeviceRepository, IDevicesService } from './interfaces/device.interface';
import { BitLockerAndRecovaryKey, DeviceCount, DeviceDTO, Inventory, QueryDevices } from './dto/device.dto';
import { Device } from './entities/device.entity';
import { DeviceMapper } from './mapper/device.mapper';
import { UpdateDeviceDTO } from './dto/updateDevice.dto';
import { DeviceStatus, DeviceType, OSType } from 'src/config/enum.config';
import { UUID } from 'crypto';
import { User } from '../users/entities/user.entity';
import { OSInfo } from '../osInfo/entities/osInfo.entity';
import { IOSInfoService } from '../osInfo/Interfaces/osInfo.interface';
import { OSInfoDto } from '../osInfo/dtos/osInfo.dto';
@Injectable()
export class DeviceService implements IDevicesService {

  constructor(@Inject("IDeviceRepository") private readonly deviceRepository: IDeviceRepository,
    @Inject("IOSInfoService") private readonly osService: IOSInfoService) { }
  logger = new Logger();

  public async allDevices(query: QueryDevices): Promise<Record<string, object>> {
    try {
      let allDevice: Device[] & OSInfo[] = await this.deviceRepository.findAllDevices(query);
      let deviceCount: DeviceCount[] | number = await this.deviceRepository.findTotalCountByStatusAndDeviceType(query.deviceStatus, query.deviceType, query.osType, true, query.searchString);
      let resp: DeviceDTO[] = allDevice.map((item: Device & OSInfo) => DeviceMapper.mapToDto(item));
      return Promise.resolve({
        response: resp,
        totalCount: Object(deviceCount)
      });
    } catch (error) {
      this.logger.error("This error occurred in DeviceService. Method Name: allDevices", error);
      return Promise.reject(error);
    }
  }

  public async createDevice(deviceDto: DeviceDTO): Promise<DeviceDTO> {
    try {
      let checkDevice:{exists:boolean, message:string} = await this.checkDeviceExists(deviceDto.serialNumber, deviceDto.hostName);
      if(checkDevice.exists){
        throw new Error(checkDevice.message);
      }
      let osInfo: OSInfoDto = await this.osService.osInfoByVersion(deviceDto.osVersion, deviceDto.osType);
      if (!osInfo) throw new Error("OS not found");
      deviceDto.userId ? deviceDto.deviceStatus = DeviceStatus.Active : deviceDto.deviceStatus = DeviceStatus.Dead;
      let deviceEntity: Device = DeviceMapper.mapToEntity({ ...deviceDto, ...osInfo });
      deviceEntity = await this.deviceRepository.insertDevice(deviceEntity);
      let res = DeviceMapper.mapToDeviceDto(deviceEntity);
      return Promise.resolve(res);
    } catch (error) {
      this.logger.error("This error occurred in DeviceService. Method Name: createDevice", error);
      return Promise.reject(error);
    }
  }

  public async updateDeviceStatus(updateDeviceDTO: UpdateDeviceDTO, deviceIds?: UUID[]): Promise<Record<string, string>> {
    try {
      let updateDeviceEntity: Device = DeviceMapper.mapToEntity(updateDeviceDTO);
      let res: number = await this.deviceRepository.updateDeviceStatus(updateDeviceEntity, deviceIds);
      if (res > 0) {
        return Promise.resolve({ message: "Device updated successfully" });
      }
      return Promise.resolve({ message: "No devices were updated" });
    } catch (error) {
      this.logger.error("This error occurred in DeviceService. Method Name: updateDeviceStatus", error);
      return Promise.reject(error);
    }
  }

  public async findTotalCountByStatusAndDeviceType(deviceStatus: DeviceStatus, deviceType: DeviceType, osType: OSType): Promise<DeviceCount[] | number> {
    try {
      let res = await this.deviceRepository.findTotalCountByStatusAndDeviceType(deviceStatus, deviceType, osType);
      return Promise.resolve(res);
    } catch (error) {
      this.logger.error("This error occurred in DeviceService. Method Name: findTotalCountByStatusAndDeviceType", error);
      return Promise.reject(error);
    }
  }

  // public async deleteDevicesByUserId(userId: UUID): Promise<Record<string, number>> {
  //   try {
  //     let allDevices = await this.getAssignedDevicesToUser(userId);
  //     let backupDevices = await this.deviceRepository.insertDeviceHistory(allDevices);
  //     let res: number = await this.deviceRepository.deleteDevicesByUserId(userId);
  //     return Promise.resolve({ "affectedRows": res });
  //   } catch (error) {
  //     this.logger.error("This error occurred in DeviceService. Method Name: deleteDevicesByUserId", error);
  //     return Promise.reject(error);
  //   }
  // }

  // public async getAssignedDevicesToUser(userId: UUID): Promise<DeviceDTO[]> {
  //   try {
  //     let res:Device[] = await this.deviceRepository.getAssignedDevicesToUser(userId);
  //     let allDevies = res.map((item:Device)=>DeviceMapper.mapToDto(item));
  //     return Promise.resolve(allDevies);
  //   } catch (error) {
  //     this.logger.error("This error occurred in DeviceService. Method Name: deleteDevicesByUserId", error);
  //     return Promise.reject(error);
  //   }
  // }

  // public async assignDevice(userId:UUID, deviceIds:UUID[]):Promise<any>{
  //   try{
  //     let res:UUID[]=[];
  //     res=await this.deviceRepository.allocateDevice(userId,deviceIds)
  //     return Promise.resolve(res);
  //   }catch(error){
  //     this.logger.error("This error occurred in DeviceService. Method Name: assignDevice", error);
  //     return Promise.reject(error);
  //   }
  // }

  public async getInventory(page: number, limit: number, searchString?: string): Promise<Record<string, Inventory[] | number>> {
    try {
      let res: (Device & User & OSInfo)[] = await this.deviceRepository.getInventory(page, limit, searchString);
      let allDevies: Inventory[] = res.map((item: (Device & User & OSInfo)) => DeviceMapper.mapToInventory(item));
      let { TotalCount } = await this.deviceRepository.getInventoryCount(searchString);
      return Promise.resolve({ allDevies, totalCount: TotalCount });
    } catch (error) {
      this.logger.error("This error occurred in DeviceService. Method Name: getInventory", error);
      return Promise.reject(error);
    }
  }

  public async deleteDeviceById(deviceId: UUID): Promise<string> {
    try {
      let res: number = await this.deviceRepository.deleteDevice(deviceId);
      if (res > 0) {
        return Promise.resolve("Device Deleted Successfully");
      }
      return Promise.resolve("Device Not Deleted. Some Error Occurred");
    } catch (error) {
      this.logger.error("This error occurred in DeviceService. Method Name: deleteDeviceById", error);
      return Promise.reject(error);
    }
  }

  public async updateDevice(body: DeviceDTO): Promise<DeviceDTO> {
    try {
      let osInfo: OSInfoDto = await this.osService.osInfoByVersion(body.osVersion, body.osType);
      if (!osInfo) throw new Error("OS not found");
      let deviceEntity: Device = DeviceMapper.mapToEntity({...body, ...osInfo});
      let res: Device = await this.deviceRepository.updateDevice(deviceEntity);
      let device: DeviceDTO;
      device = DeviceMapper.mapToDeviceDto(res);
      return Promise.resolve(device);
    } catch (error) {
      this.logger.error("This error occurred in DeviceService. Method Name: updateDevice", error);
      return Promise.reject(error);
    }
  }

  public async markAsDeadDevice(deviceId: UUID): Promise<number> {
    try {
      let res: number = await this.deviceRepository.markAsDeadDevice(deviceId);
      return Promise.resolve(res);
    } catch (error) {
      this.logger.error("This error occurred in DeviceService. Method Name: markAsDeadDevice", error);
      return Promise.reject(error);
    }
  }

  public async addBitlockerKey(info: BitLockerAndRecovaryKey): Promise<string> {
    try {
      // const deviceInfo:Device|null = await this.deviceRepository.getDeviceById(info.id);
      // if (deviceInfo.bitlockerId && deviceInfo.recoveryKey) throw new Error("Bitlocker already added");
      let res: number = await this.deviceRepository.addBitlockerKey(info);
      if (res === 0) {
        throw new HttpException("Device Not Found", 404);
      }
      return Promise.resolve("Bitlocker Added Successfully");
    } catch (error) {
      this.logger.error("This error occurred in DeviceService. Method Name: addBitlockerKey", error);
      return Promise.reject(error);
    }
  }

  private async checkDeviceExists(serialNumber: string, hostName: string): Promise<{ exists: boolean, message: string }> {
    try {
      let res: Device | null = await this.deviceRepository.getDeviceInfoByHostOrSerial(serialNumber, hostName);
      if (res && res.serialNumber == serialNumber) {
        return Promise.resolve({exists:true, message:"Device Already exists with the same serial number."});
      }else if(res && res.hostName == hostName){
        return Promise.resolve({exists:true, message:"Device Already exists with the same host name."});
      }
        return Promise.resolve({exists:false, message:""});
    } catch (error) {
      this.logger.error("This error occurred in DeviceService. Method Name: checkDeviceExists", error);
      return Promise.reject(error);
    }
  }

}
