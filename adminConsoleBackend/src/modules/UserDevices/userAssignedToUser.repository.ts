import { InjectRepository } from "@nestjs/typeorm";
import { Device } from "../devices/entities/device.entity";
import { User } from "../users/entities/user.entity";
import { Inventory } from "./dto/userAssignedToDevice.dto";
import { IUsersDevicesRepository } from "./interface/userAssignedToDevices.interface";
import { Repository, In, Brackets } from "typeorm";
import { UsersAssets } from "./entities/user_devices.entity";
import { DeviceStatus } from "src/config/enum.config";
import { Logger } from "@nestjs/common";
import { UUID } from "crypto";
import { DeleteResult } from "typeorm/browser";
import { OSInfo } from "../osInfo/entities/osInfo.entity";

export class UsersDevicesRepository implements IUsersDevicesRepository {
  constructor(
    @InjectRepository(Device) private readonly deviceRepo: Repository<Device>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(UsersAssets)
    private readonly assetRepo: Repository<UsersAssets>
  ) {}

  logger = new Logger();

  public async getInventory(
    page: number,
    limit: number,
    searchString?: string
  ): Promise<(Device & User & UsersAssets & OSInfo)[]> {
    try {
      let res: (Device & User & UsersAssets & OSInfo)[];
      let query = this.assetRepo
        .createQueryBuilder("assets")
        .innerJoin("Users", "users", "users.userId=assets.userId")
        .innerJoin("Device", "devices", "devices.Id=assets.deviceId")
        .innerJoin("OSInfo", "OI", "devices.OSId = OI.OSId")
        .select("devices.Id", "id")
        .addSelect("users.firstName", "firstName")
        .addSelect("users.middleName", "middleName")
        .addSelect("users.LastName", "lastName")
        .addSelect("users.Email", "email")
        .addSelect("users.Role", "role")
        .addSelect("devices.Status", "deviceStatus")
        .addSelect("devices.DeviceType", "deviceType")
        .addSelect("devices.MACAddress", "macAddress")
        .addSelect("devices.HostName", "hostName")
        .addSelect("OI.OSType", "osType")
        .addSelect("OI.OSName", "osName")
        .addSelect("OI.OSVersion", "osVersion")
        .addSelect("devices.SerialNumber", "serialNumber")
        .addSelect("devices.Brand", "brand")
        .addSelect("assets.ID", "assetId")
        .where("devices.Status=:status", { status: DeviceStatus.Active })
        .andWhere("devices.IsDeleted =:isDeleted", { isDeleted: false });

      if (searchString) {
        query = query.andWhere(
          new Brackets((qb) => {
            qb.andWhere("users.FirstName LIKE :searchString", {
              searchString: `%${searchString}%`,
            })
              .orWhere("users.MiddleName LIKE :searchString", {
                searchString: `%${searchString}%`,
              })
              .orWhere("users.LastName LIKE :searchString", {
                searchString: `%${searchString}%`,
              })
              .orWhere("users.Email LIKE :searchString", {
                searchString: `%${searchString}%`,
              })
              .orWhere("devices.SerialNumber LIKE :searchString", {
                searchString: `%${searchString}%`,
              })
              .orWhere("devices.HostName LIKE :searchString", {
                searchString: `%${searchString}%`,
              });
          })
        );
        //     .getRawMany();
        // return Promise.resolve(res);
      }

      res = await query
        .offset(Number((page - 1) * limit))
        .limit(limit)
        .getRawMany();
      return Promise.resolve(res);
    } catch (error) {
      this.logger.error(
        "This error occurred in UsersDevicesRepository. Method Name: getInventory",
        error
      );
      return Promise.reject(error);
    }
  }

  public async getInventoryCount(
    searchString?: string
  ): Promise<{ TotalCount: number }> {
    try {
      let query = this.assetRepo
        .createQueryBuilder("assets")
        .innerJoin("Users", "users", "users.userId=assets.userId")
        .innerJoin("Device", "devices", "devices.Id=assets.deviceId")
        .where("devices.Status=:status", { status: DeviceStatus.Active })
        .andWhere("devices.IsDeleted = :isDeleted", { isDeleted: false });

      if (searchString) {
        query = query.andWhere(
          new Brackets((qb) => {
            qb.andWhere("users.FirstName LIKE:searchString", {
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
              })
              .orWhere("devices.HostName LIKE :searchString", {
                searchString: `%${searchString}%`,
              });
          })
        );
        //     .getRawMany();
        // return Promise.resolve(res);
      }

      let res = await query.getCount();
      console.log(res);
      return { TotalCount: res };
      // return Promise.resolve(res);
    } catch (error) {
      this.logger.error(
        "This error occurred in UsersDevicesRepository. Method Name: getInventory",
        error
      );
      return Promise.reject(error);
    }
  }

  public async allocateDevice(body: UsersAssets[]): Promise<UsersAssets[]> {
    try {
      let res: UsersAssets[] = await this.assetRepo.save(body);
      return Promise.resolve(res);
    } catch (error) {
      this.logger.error(
        "This error occurred in User Device Repository. Method Name: allocateDevice",
        error
      );
      return Promise.reject(error);
    }
  }

  public async getDevicesByUserId(userId: string): Promise<string[]> {
    try {
      let res = await this.assetRepo.find({
        where: { userId: userId },
        select: ["deviceId"],
      });
      let devicelist: string[] = [];
      let list = devicelist.concat(res.map((item) => item.deviceId));
      return Promise.resolve(list);
    } catch (error) {
      this.logger.error(
        "This error occured in UsersDevicesRepository. Method Name: getDevicesByUserId",
        error
      );
      return Promise.reject(error);
    }
  }

  public async assetsWithdrawal(userId: string): Promise<any> {
    try {
      let res = await this.assetRepo.delete({ userId: userId });
      return Promise.resolve(res.affected);
    } catch (error) {
      this.logger.error(
        "This error occured in UserDevicesRepository. Method Name: assetsWithdrawal",
        error
      );
      return Promise.reject(error);
    }
  }

  public async findAndUpdate(device: string[]): Promise<any> {
    try {
      let allocatedDevices = await this.assetRepo
        .createQueryBuilder("UA")
        .select("UA.DeviceID")
        .where("UA.DeviceID IN (:deviceIds)", { deviceIds: device })
        .groupBy("UA.DeviceID")
        .getRawMany();
      allocatedDevices = allocatedDevices.map((item) => item.DeviceID);
      let deviceSet = new Set(allocatedDevices);
      let unAllocatedDevices = device.filter((item) => {
        if (!deviceSet.has(item)) return item;
      });
      let status = this.deviceRepo.update(
        { id: In(unAllocatedDevices) },
        { deviceStatus: DeviceStatus.Dead }
      );
      return Promise.resolve(status);
    } catch (error) {
      this.logger.error(
        "This error occured in UserDevicesRepository. Method Name: findAndUpdate",
        error
      );
      return Promise.reject(error);
    }
  }

  public async deleteUserFromDevice(
    assetId: UUID
  ): Promise<Record<string, any>> {
    try {
      let record = await this.assetRepo.findOne({
        where: { assetId: assetId },
      });
      let res: DeleteResult = await this.assetRepo.delete({ assetId: assetId });
      return Promise.resolve({
        deletedRecord: record,
        affectedRows: Number(res.affected),
      });
    } catch (error) {
      this.logger.error(
        "This error occured in UserDevicesRepository. Method Name: deleteUserFromDevice",
        error
      );
      return Promise.reject(error);
    }
  }

  public async getUsersByDeviceId(deviceId: UUID): Promise<UsersAssets[]> {
    try {
      let res: UsersAssets[] = await this.assetRepo.find({
        where: { deviceId: deviceId },
      });
      return Promise.resolve(res);
    } catch (error) {
      this.logger.error(
        "This error occured in UserDevicesRepository. Method Name: getUsersByDeviceId",
        error
      );
      return Promise.reject(error);
    }
  }

  public async getInfoOfDevicesAndUser(
    page: number,
    limit: number,
    searchString?: string
  ): Promise<(Device & User & UsersAssets & OSInfo)[]> {
    try {
      let res: (Device & User & UsersAssets & OSInfo)[];
      let query = this.deviceRepo
        .createQueryBuilder("devices")
        .leftJoin(
          "UsersAssets",
          "UsersAssets",
          "devices.Id = UsersAssets.deviceId"
        )
        .leftJoin("Users", "users", "users.UserID = UsersAssets.userId")
        .innerJoin("OSInfo", "OI", "devices.OSId = OI.OSId")
        .select("devices.Id", "id")
        .addSelect("users.firstName", "firstName")
        .addSelect("users.UserID", "userId")
        .addSelect("users.middleName", "middleName")
        .addSelect("users.LastName", "lastName")
        .addSelect("users.Email", "email")
        .addSelect("users.Role", "role")
        .addSelect("devices.Status", "deviceStatus")
        .addSelect("devices.DeviceType", "deviceType")
        .addSelect("devices.MACAddress", "macAddress")
        .addSelect("devices.HostName", "hostName")
        .addSelect("OI.OSType", "osType")
        .addSelect("OI.OSName", "osName")
        .addSelect("OI.OSVersion", "osVersion")
        .addSelect("devices.SerialNumber", "serialNumber")
        .addSelect("devices.Brand", "brand")
        .addSelect("devices.BitLockerID", "bitlockerId")
        .addSelect("devices.RecoveryKey", "recoveryKey")
        .where("devices.isDeleted = :isDeleted", { isDeleted: false });
      if (searchString) {
        query = query.andWhere(
          new Brackets((qb) => {
            qb.andWhere("devices.SerialNumber LIKE :searchString", {
              searchString: `%${searchString}%`,
            })
              .orWhere("devices.HostName LIKE :searchString", {
                searchString: `%${searchString}%`,
              })
              .orWhere("devices.RecoveryKey LIKE :searchString", {
                searchString: `%${searchString}%`,
              })
              .orWhere("devices.BitLockerID LIKE :searchString", {
                searchString: `%${searchString}%`,
              });
            // .orWhere("users.Email LIKE :searchString", { searchString: `%${searchString}%` })
            // .orWhere("users.MiddleName LIKE :searchString", { searchString: `%${searchString}%` })
            // .orWhere("users.LastName LIKE :searchString", { searchString: `%${searchString}%` })
            // .orWhere("users.Email LIKE :searchString", { searchString: `%${searchString}%` })
            // .orWhere("users.FirstName LIKE :searchString", { searchString: `%${searchString}%` })
          })
        );
      }
      res = await query
        .offset(Number((page - 1) * limit))
        .limit(limit)
        .getRawMany();
      return Promise.resolve(res);
    } catch (error) {
      this.logger.error(
        "This error occurred in UserAssignedToDevice Repository. Method Name: getInfoOfDevicesAndUser",
        error
      );
      return Promise.reject(error);
    }
  }
  public async getInfoOfDevicesAndUserCount(
    searchString?: string
  ): Promise<{ TotalCount: number }> {
    try {
      let query = this.deviceRepo
        .createQueryBuilder("devices")
        .leftJoin(
          "UsersAssets",
          "UsersAssets",
          "devices.Id = UsersAssets.deviceId"
        )
        .leftJoin("Users", "users", "users.UserID = UsersAssets.userId")
        .where("devices.isDeleted = :isDeleted", { isDeleted: false });

      if (searchString) {
        query = query.andWhere(
          new Brackets((qb) => {
            qb.andWhere("devices.SerialNumber LIKE :searchString", {
              searchString: `%${searchString}%`,
            })
              .orWhere("devices.HostName LIKE :searchString", {
                searchString: `%${searchString}%`,
              })
              .orWhere("devices.RecoveryKey LIKE :searchString", {
                searchString: `%${searchString}%`,
              })
              .orWhere("devices.bitLockerId LIKE :searchString", {
                searchString: `%${searchString}%`,
              });
            // .orWhere("users.MiddleName LIKE :searchString", { searchString: `%${searchString}%` })
            // .orWhere("users.LastName LIKE :searchString", { searchString: `%${searchString}%` })
            // .orWhere("users.Email LIKE :searchString", { searchString: `%${searchString}%` })
            // .orWhere("users.FirstName LIKE :searchString", { searchString: `%${searchString}%` })
          })
        );
      }
      let res = await query.getCount();
      console.log(res);
      return { TotalCount: res };
      // return Promise.resolve(res);
    } catch (error) {
      this.logger.error(
        "This error occurred in UserDevice Repository. Method Name: getInfoOfDevicesAndUserCount",
        error
      );
      return Promise.reject(error);
    }
  }
}
