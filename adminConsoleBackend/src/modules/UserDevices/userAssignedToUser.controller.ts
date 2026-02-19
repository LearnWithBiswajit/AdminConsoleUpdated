import { Body, Controller, Delete, Get, Inject, Logger, Param, Patch, Post, Query } from "@nestjs/common";
import { IUserDevicesService } from "./interface/userAssignedToDevices.interface";
import { Inventory, UserToDevice } from "./dto/userAssignedToDevice.dto";
import { UUID } from "crypto";

@Controller('UserDevice')
export class UsersDevicesController {

  constructor(@Inject("IUserDevicesService") private readonly usersDevicesServices: IUserDevicesService) { }

  logger = new Logger()

  @Get('/inventory')
  public async getInventory(@Query("page") page: number, @Query("limit") limit: number, @Query("searchString") searchString: string): Promise<Record<string, Inventory[] | number>> {
    try {
      let res = await this.usersDevicesServices.getInventory(page, limit, searchString);
      return Promise.resolve(res);
    } catch (error) {
      this.logger.error("This error occurred in Device Controller. Method Name: getInventory", error);
      return Promise.reject(error);
    }
  }

  @Post('/assignDevice')
  public async assingDevice(@Body() body: UserToDevice) {
    try {
      //    const ids = Array.isArray(deviceIds) ? deviceIds : [deviceIds];
      let res = await this.usersDevicesServices.assignDevice(body);
      return Promise.resolve(res.length);
    } catch (error) {
      this.logger.error("This error occurred in Device Controller. Method Name: assingDevice", error);
      return Promise.reject(error);
    }
  }

  @Delete('/deleteAsssets/:userId')
  public async deleteAssignedDevicesOfUser(@Param("userId") userId: UUID) {
    try {
      let res = await this.usersDevicesServices.deleteAssignedDevicesOfUser(userId);
      return Promise.resolve(res);
    } catch (error) {
      this.logger.error("This error occured in UsersDevicesController. Method Name: deleteAssignedDevicesOfUser", error);
      return Promise.reject(error);
    }
  }

  @Patch('/removeUser/:assetId')
  public async releaseUser(@Param('assetId') assetId: UUID): Promise<object> {
    try {
      const res = await this.usersDevicesServices.releaseUserFromDevice(assetId);
      return Promise.resolve(res);
    } catch (error) {
      this.logger.error("This error occurred in DeviceController. Method Name: releaseUser", error);
      return Promise.reject(error);
    }
  }

  @Get("/bitlockerInfo")
  public async getInfoOfDevicesAndUser(@Query("page") page: number, @Query("limit") limit: number, @Query("searchString") searchString: string): Promise<Record<string, Inventory[] | number>> {
    try {
      let res = await this.usersDevicesServices.getInfoOfDevicesAndUser(page, limit, searchString);
      return Promise.resolve(res);
    } catch (error) {
      this.logger.error("This error occurred in Device Controller. Method Name: getInventory", error);
      return Promise.reject(error);
    }
  }

}

