import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Device } from "./entities/device.entity";
import { Brackets, In, Like, Or, Repository, UpdateResult } from "typeorm";
import { IDeviceRepository } from "./interfaces/device.interface";
import { DeviceStatus, DeviceType, OSType } from "src/config/enum.config";
import {
  BitLockerAndRecovaryKey,
  DeviceCount,
  QueryDevices,
} from "./dto/device.dto";
import { UUID } from "crypto";
import { DeviceUsageHistory } from "./entities/deviceHistory.entity";
import { User } from "../users/entities/user.entity";
import { OSInfo } from "../osInfo/entities/osInfo.entity";

@Injectable()
export class DeviceRepository implements IDeviceRepository {
  constructor(
    @InjectRepository(Device) private readonly deviceRepo: Repository<Device>,
    @InjectRepository(DeviceUsageHistory)
    private readonly deviceHistoryRepo: Repository<DeviceUsageHistory>,
    @InjectRepository(OSInfo) private readonly osInfoRepo: Repository<OSInfo>
  ) {}
  logger = new Logger();

  public async findAllDevices(
    query: QueryDevices
  ): Promise<Device[] & OSInfo[]> {
    try {
      // let res = await this.deviceRepo.find({ where: [{ deviceStatus: query.deviceStatus, deviceType: query.deviceType, osType: query.osType, isDeleted:false, serialNumber: Like(query.searchString ? `%${query.searchString}%` : `%%`) },{ deviceStatus: query.deviceStatus, deviceType: query.deviceType, osType: query.osType, isDeleted:false, hostName: Like(query.searchString ? `%${query.searchString}%` : `%%`) }], skip: Number((query.page - 1) * query.limit), take: query.limit });

      let dbQuery = this.deviceRepo
        .createQueryBuilder("D")
        .innerJoin("OSInfo", "OI", "D.OSId = OI.OSId")
        .select("D.Id", "id")
        .addSelect("D.DeviceType", "deviceType")
        .addSelect("D.Status", "deviceStatus")
        .addSelect("D.HostName", "hostName")
        .addSelect("D.SerialNumber", "serialNumber")
        .addSelect("D.Brand", "brand")
        .addSelect("D.MACAddress", "macAddress")
        .addSelect("D.BitlockerID", "bitlockerId")
        .addSelect("D.recoveryKey", "recoveryKey")
        .addSelect("OI.OSType", "osType")
        .addSelect("OI.OSName", "osName")
        .addSelect("OI.OSVersion", "osVersion")
        .where("D.IsDeleted =:isDeleted", { isDeleted: false });

        if(query.deviceStatus){
          dbQuery.andWhere("COALESCE(D.Status) =:status", { status: query.deviceStatus });
        }
        if(query.deviceType){
          dbQuery.andWhere("D.DeviceType =:deviceType", { deviceType: query.deviceType });
        }
        if(query.osType){
          dbQuery.andWhere("OI.OSType =:osType", { osType: query.osType });
        }

      if (query.searchString) {
        dbQuery = dbQuery.andWhere(
          new Brackets((qb) => {
            qb.where("D.SerialNumber LIKE :searchString", {
              searchString: query.searchString,
            }).orWhere("D.HostName LIKE :searchString", {
              searchString: query.searchString,
            });
          })
        );
      }

      let res = await dbQuery
        .limit(query.limit)
        .offset(Number(query.page - 1) * query.limit)
        .getRawMany();
      return Promise.resolve(res);
    } catch (error) {
      this.logger.error(
        "This error occurred in Device Repository. Method Name: findAllDevices",
        error
      );
      return Promise.reject(error);
    }
  }

  public async insertDevice(deviceEntity: Device): Promise<Device> {
    try {
      let res = await this.deviceRepo.save(deviceEntity);
      return Promise.resolve(res);
    } catch (error) {
      this.logger.error(
        "This error occurred in Device Repository. Method Name: insertDevice",
        error
      );
      return Promise.reject(error);
    }
  }

  public async updateDeviceStatus(
    updateDeviceEntity: Device,
    deviceIds?: UUID[]
  ): Promise<number> {
    try {
      let updateIds: any = deviceIds
        ? deviceIds
        : updateDeviceEntity?.id
          ? Array.of(updateDeviceEntity.id)
          : null;
      let res: UpdateResult = await this.deviceRepo.update(
        { id: In(updateIds) },
        { deviceStatus: updateDeviceEntity.deviceStatus }
      );
      if (res.affected && res.affected > 0) {
        return Promise.resolve(res.affected);
      } else {
        return Promise.resolve(0);
      }
    } catch (error) {
      this.logger.error(
        "This error occurred in Device Repository. Method Name: updateDeviceStatus",
        error
      );
      return Promise.reject(error);
    }
  }

  public async findTotalCountByStatusAndDeviceType(
    deviceStatus: DeviceStatus,
    deviceType: DeviceType,
    osType: OSType,
    flag?: boolean,
    searchString?: string
  ): Promise<DeviceCount[] | number> {
    try {
      let res: DeviceCount[];
      if (!osType && !flag) {
        let query = this.deviceRepo
          .createQueryBuilder("D")
          .innerJoin("OSInfo", "OI", "D.OSId = OI.OSId")
          .select("D.DeviceType", "deviceType")
          .addSelect("OI.OSType", "osType")
          .addSelect("COUNT(1)", "count")
          .where("D.Status = :deviceStatus", { deviceStatus: deviceStatus })
          .andWhere("D.IsDeleted = :isDeleted", { isDeleted: false })
          .groupBy("OI.OSType, D.DeviceType");

        if (deviceType) {
          query.andWhere("D.DeviceType = :deviceType", {
            deviceType: deviceType,
          });
        }
        this.logger.log(
          `Execution started for fetching total count with device type ${deviceType}`
        );
        let res = query.getRawMany();
        this.logger.log(
          `Execution completed for fetching total count with device type ${deviceType}`
        );
        console.log(res);
        return Promise.resolve(res);
      }
      this.logger.log(`Executing fetching total count without device type`);
      //   return await this.deviceRepo.count({
      //     where: [
      //       {
      //         deviceStatus: deviceStatus,
      //         deviceType: deviceType,
      //         osType: osType,
      //         isDeleted: false,
      //         serialNumber: Like(searchString ? `%${searchString}%` : `%%`),
      //       },
      //       {
      //         deviceStatus: deviceStatus,
      //         deviceType: deviceType,
      //         osType: osType,
      //         isDeleted: false,
      //         hostName: Like(searchString ? `%${searchString}%` : `%%`),
      //       },
      //     ],
      //   });

      let dbQuery = this.deviceRepo
        .createQueryBuilder("D")
        .innerJoin("OSInfo", "OI", "D.OSId = OI.OSId")
        .where("D.Status =:status", { status: deviceStatus })
        .andWhere("D.DeviceType =:deviceType", { deviceType: deviceType })
        .andWhere("OI.OSType =:osType", { osType: osType })
        .andWhere("D.IsDeleted =:isDeleted", { isDeleted: false });

      if (searchString) {
        dbQuery = dbQuery.andWhere(
          new Brackets((qb) => {
            qb.where("D.SerialNumber LIKE :searchString", {
              searchString: searchString,
            }).orWhere("D.HostName LIKE :searchString", {
              searchString: searchString,
            });
          })
        );
      }

      return await dbQuery.getCount();
    } catch (error) {
      this.logger.error(
        "This error occurred in Device Repository. Method Name: findTotalCountByStatusAndDeviceType",
        error
      );
      return Promise.reject(error);
    }
  }

  // public async deleteDevicesByUserId(userId: UUID): Promise<number> {
  //     try {
  //         const res: UpdateResult = await this.deviceRepo.update({ userId: userId }, { deviceStatus: DeviceStatus.Active, userId: "" });
  //         return Promise.resolve(res.affected ? res.affected : 0);
  //     } catch (error) {
  //         this.logger.error("This error occurred in Device Repository. Method Name: deleteDevicesByUserId", error);
  //         return Promise.reject(error);
  //     }
  // }

  public async insertDeviceHistory(
    deviceInfo: DeviceUsageHistory[]
  ): Promise<any> {
    try {
      let res = await this.deviceHistoryRepo.insert(deviceInfo);
      console.log(res);
      return Promise.resolve(res);
    } catch (error) {
      this.logger.error(
        "This error occurred in Device Repository. Method Name: insertDeviceHistory",
        error
      );
      return Promise.reject(error);
    }
  }

  // public async getAssignedDevicesToUser(userId: UUID): Promise<Device[]> {
  //     try {
  //         return await this.deviceRepo.find({ where: { userId: userId, isDeleted:false } });
  //     } catch (error) {
  //         this.logger.error("This error occurred in Device Repository. Method Name: getAssignedDevicesToUser", error);
  //         return Promise.reject(error);
  //     }
  // }

  // public async allocateDevice(userId: UUID, deviceIds: UUID[]): Promise<any> {
  //     try {
  //         let res1: UpdateResult = await this.deviceRepo.createQueryBuilder()
  //             .update(Device)
  //             .set({ userId, deviceStatus: DeviceStatus.Active })
  //             .where('id IN (:...ids)', { ids: deviceIds })
  //             .execute();
  //         return Promise.resolve(res1.affected)
  //     } catch (error) {
  //         this.logger.error("This error occurred in Device Repository. Method Name: allocateDevice", error);
  //         return Promise.reject(error);
  //     }
  // }

  public async getInventory(
    page: number,
    limit: number,
    searchString?: string
  ): Promise<(Device & User & OSInfo)[]> {
    try {
      let res: (Device & User & OSInfo)[]=[];
      // let query = this.deviceRepo
      //   .createQueryBuilder("devices")
      //   .innerJoin("Users", "users", "users.userId=devices.userId")
      //   .innerJoin("OSInfo", "OI", "devices.OSId=OI.OSId")
      //   .select("devices.Id", "id")
      //   .addSelect("users.firstName", "firstName")
      //   .addSelect("users.middleName", "middleName")
      //   .addSelect("users.LastName", "lastName")
      //   .addSelect("users.Email", "email")
      //   .addSelect("devices.Status", "deviceStatus")
      //   .addSelect("devices.DeviceType", "deviceType")
      //   .addSelect("devices.MACAddress", "macAddress")
      //   .addSelect("devices.HostName", "hostName")
      //   .addSelect("OI.OSType", "osType")
      //   .addSelect("devices.SerialNumber", "serialNumber")
      //   .addSelect("devices.Brand", "brand")
      //   .where("devices.Status=:status", { status: DeviceStatus.Active })
      //   .andWhere("devices.IsDeleted=:isDeleted", { isDeleted: false });

      // if (searchString) {
      //   query = query.andWhere(
      //     new Brackets((qb) => {
      //       qb.where("users.firstName LIKE :searchString", {
      //         searchString: `%${searchString}%`,
      //       })
      //         .orWhere("users.middlename LIKE :searchString", {
      //           searchString: `%${searchString}%`,
      //         })
      //         .orWhere("users.lastName LIKE :searchString", {
      //           searchString: `%${searchString}%`,
      //         })
      //         .orWhere("users.Email LIKE :searchString", {
      //           searchString: `%${searchString}%`,
      //         })
      //         .orWhere("devices.SerialNumber LIKE :searchString", {
      //           searchString: `%${searchString}%`,
      //         });
      //     })
      //   );
      // }

      // res = await query
      //   .offset(Number((page - 1) * limit))
      //   .limit(limit)
      //   .getRawMany();
      return Promise.resolve(res);
    } catch (error) {
      this.logger.error(
        "This error occurred in Device Repository. Method Name: getInventory",
        error
      );
      return Promise.reject(error);
    }
  }

  public async getInventoryCount(
    searchString?: string
  ): Promise<{ TotalCount: number }> {
    try {
      let query = await this.deviceRepo
        .createQueryBuilder("devices")
        .innerJoin("Users", "users", "users.userId=devices.userId")
        .where("devices.Status=:status", { status: DeviceStatus.Active })
        .andWhere("devices.IsDeleted=:isDeleted", { isDeleted: false });

      if (searchString) {
        query = await query
          .andWhere("users.FirstName LIKE:searchString", {
            searchString: `%${searchString}%`,
          })
          .orWhere("users.MiddleName LIKE:searchString", {
            searchString: `%${searchString}%`,
          })
          .orWhere("users.LastName LIKE:searchString", {
            searchString: `%${searchString}%`,
          })
          .orWhere("users.Email LIKE:searchString", {
            searchString: `%${searchString}%`,
          })
          .orWhere("devices.SerialNumber LIKE:searchString", {
            searchString: `%${searchString}%`,
          });
        //     .getRawMany();
        // return Promise.resolve(res);
      }

      let res = await query.getCount();
      console.log(res);
      return { TotalCount: res };
      // return Promise.resolve(res);
    } catch (error) {
      this.logger.error(
        "This error occurred in Device Repository. Method Name: getInventory",
        error
      );
      return Promise.reject(error);
    }
  }

  public async deleteDevice(deviceId: UUID): Promise<number> {
    try {
      let res = await this.deviceRepo.update(
        { id: deviceId },
        { isDeleted: true }
      );
      console.log(res);
      return Promise.resolve(res.affected ? res.affected : 0);
    } catch (error) {
      this.logger.error(
        "This error occurred in Device Repository. Meethod Name: deleteDevice",
        error
      );
      return Promise.reject(error);
    }
  }

  public async getDeviceById(id: UUID): Promise<Device> {
    try {
      let res = await this.deviceRepo.findOne({ where: { id: id } });
      if (!res) {
        throw new Error("No such device found");
      }
      return Promise.resolve(res);
    } catch (error) {
      this.logger.error(
        "This error occurred in Device Repository. Method Name: getDeviceById",
        error
      );
      return Promise.reject(error);
    }
  }

  public async updateDevice(body: Device): Promise<Device> {
    try {
      let res = this.deviceRepo.save(body);
      return Promise.resolve(res);
    } catch (error) {
      this.logger.error(
        "This error occured in DeviceRepository. Method Name: UpdateDevice",
        error
      );
      return Promise.reject(error);
    }
  }

  public async markAsDeadDevice(deviceId: UUID): Promise<number> {
    try {
      let res: UpdateResult = await this.deviceRepo.update(
        { id: deviceId },
        { deviceStatus: DeviceStatus.Dead }
      );
      return Promise.resolve(Number(res.affected));
    } catch (error) {
      this.logger.error(
        "This error occured in DeviceRepository. Method Name: markAsDeadDevice",
        error
      );
      return Promise.reject(error);
    }
  }

  public async addBitlockerKey(info: BitLockerAndRecovaryKey): Promise<number> {
    try {
      let res: any = await this.deviceRepo.update(
        { id: info.id },
        { bitlockerId: info.bitlockerId, recoveryKey: info.recoveryKey }
      );
      return Promise.resolve(Number(res.affected));
    } catch (error) {
      this.logger.error(
        "This error occured in DeviceRepository. Method Name: addBitlockerKey",
        error
      );
      return Promise.reject(error);
    }
  }

  // public async bitlockerByDeviceId(deviceId: UUID): Promise<Device|null> {
  //     try {
  //         let res:Device|null = await this.deviceRepo.findOne({where:{id:deviceId}});
  //         return Promise.resolve(res);
  //     } catch (error) {
  //         this.logger.error("This error occured in DeviceRepository. Method Name: bitlockerByDeviceId", error);
  //         return Promise.reject(error);
  //     }
  // }
}
