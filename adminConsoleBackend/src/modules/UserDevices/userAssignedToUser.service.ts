import { Inject, Logger, Delete } from '@nestjs/common';
import { IUserDevicesService, IUsersDevicesRepository } from "./interface/userAssignedToDevices.interface";
import { Inventory, User_Device, UserToDevice } from "./dto/userAssignedToDevice.dto";
import { Device } from "../devices/entities/device.entity";
import { User } from "../users/entities/user.entity";
import { UserDeviceMapper } from "./mapper/userDevice.mapper";
import { randomUUID, UUID } from "crypto";
import { UsersAssets } from "./entities/user_devices.entity";
import { IDevicesService } from '../devices/interfaces/device.interface';
import { OSInfo } from '../osInfo/entities/osInfo.entity';

export class UserDevicesService implements IUserDevicesService{

    constructor(@Inject("IUsersDevicesRepository") private readonly usersDevicesRepository: IUsersDevicesRepository,
                @Inject("IDevicesService") private readonly deviceService:IDevicesService){}

    logger= new Logger()

    public async getInventory(page:number, limit:number, searchString?:string):Promise<Record<string, Inventory[]|number>>{
        try{
          let res:(Device&User&UsersAssets&OSInfo)[]= await this.usersDevicesRepository.getInventory(page, limit, searchString);
          let allDevies:Inventory[] = res.map((item:(Device&User&UsersAssets&OSInfo))=>UserDeviceMapper.mapToInventory(item));
          let {TotalCount} = await this.usersDevicesRepository.getInventoryCount(searchString);
          return Promise.resolve({allDevies, totalCount:TotalCount});
        }catch(error){
          this.logger.error("This error occurred in DeviceService. Method Name: getInventory", error);
          return Promise.reject(error);
        }
      }

    public async assignDevice(body:UserToDevice):Promise<UserToDevice[]>{
        try{
            let toEntity:UsersAssets[]=body.deviceIds.map((items:UUID)=> UserDeviceMapper.mapToEntity(body.userId, items));
          let res= await this.usersDevicesRepository.allocateDevice(toEntity);
          let updateDeviceStatus = this.deviceService.updateDeviceStatus({deviceStatus:1, id:randomUUID()}, body.deviceIds)
          let toDto:User_Device[]=res.map((items:UsersAssets)=> UserDeviceMapper.mapTodto(items))
          return Promise.resolve(toDto);
        }catch(error){
          this.logger.error("This error occurred in UserDevicesService. Method Name: assignDevice", error);
          return Promise.reject(error);
        }
      }

    public async deleteAssignedDevicesOfUser(userId:UUID){
      try{
        let devices:string[]=await this.usersDevicesRepository.getDevicesByUserId(userId);
        let res=await this.usersDevicesRepository.assetsWithdrawal(userId);
        if(res>0){
          // for(let device of devices){
            let status= await this.usersDevicesRepository.findAndUpdate(devices);
          // }
        }
        return Promise.resolve(res);
      }catch(error){
        this.logger.error("This error occured in UserdevicesService. Method Nme: deleteAssigneddevicesOfUser", error);
        return Promise.reject(error);
      }
    }

    public async releaseUserFromDevice(assetId: UUID): Promise<Record<string, string>> {
          try {
            let res:Record<string, any> = await this.usersDevicesRepository.deleteUserFromDevice(assetId);
            if(res.affectedRows>0 && res.deletedRecord.deviceId){
              // check assigned users to that device
              let assignedUsers:UsersAssets[] = await this.usersDevicesRepository.getUsersByDeviceId(res.deletedRecord.deviceId);
              if(assignedUsers.length === 0){
                this.deviceService.markAsDeadDevice(res.deletedRecord.deviceId);
              }
              // If no users assigned then mark the device as Dead

              return Promise.resolve({message:"User Removed Successfully"});
            }
            // return Promise.resolve({message:"Something Went Wrong"});
            throw new Error("Something Went Wrong");
          } catch (error) {
            this.logger.error("This error occurred in DeviceService. Method Name: releaseUserFromDevice", error);
              return Promise.reject(error);
          }
      }

      public async getInfoOfDevicesAndUser(page:number, limit:number, searchString?:string):Promise<Record<string, Inventory[]|number>>{
        try{
          let res:(Device&User&UsersAssets&OSInfo)[]= await this.usersDevicesRepository.getInfoOfDevicesAndUser(page, limit, searchString);
          let allDevies:Inventory[] = res.map((item:(Device&User&UsersAssets&OSInfo))=>UserDeviceMapper.mapToBitLocker(item));
          let {TotalCount} = await this.usersDevicesRepository.getInfoOfDevicesAndUserCount(searchString);
          return Promise.resolve({allDevies, totalCount:TotalCount});
        }catch(error){
          this.logger.error("This error occurred in DeviceService. Method Name: getInventory", error);
          return Promise.reject(error);
        }
      }
}