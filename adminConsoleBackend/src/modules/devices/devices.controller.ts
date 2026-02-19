import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Logger, Query, Put } from '@nestjs/common';
import { IDevicesService } from './interfaces/device.interface';
import { AssigndeviceDTO, BitLockerAndRecovaryKey, DeviceCount, DeviceDTO, Inventory, QueryDevices } from './dto/device.dto';
import { UpdateDeviceDTO } from './dto/updateDevice.dto';
import { DeviceStatus, DeviceType, OSType } from 'src/config/enum.config';
import { UUID } from 'crypto';
import { ApiAcceptedResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CurrentContext } from 'src/decorators/user.decorator';

//Appling tag for device
@ApiTags('Devices')
@Controller('devices')
export class DevicesController {
  constructor(@Inject("IDeviceService") private readonly devicesService: IDevicesService) { }
  logger = new Logger();


  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Get information of the device',
    description: 'Get information of the device using the searchstring, os type, device type and device status ',
  })
  @Get("/")
  public async getAllDevices(@CurrentContext() context: any, @Query() query: QueryDevices): Promise<Record<string, object>> {
    try {
      console.log(context);
      const resp: Record<string, object> = await this.devicesService.allDevices(query);
      return Promise.resolve(resp);
    } catch (error) {
      this.logger.error("This error occurred in Device Controller. Method Name: getAllDevices", error);
      return Promise.reject(error);
    }
  }


  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Insert new device information',
    description: 'Insert the information abount the  new device that is not present before ',
  })
  @ApiBody({
    type: DeviceDTO
  })
  @ApiCreatedResponse({
    type: DeviceDTO
  })
  @Post("/")
  public async createDevice(@Body() deviceDto: DeviceDTO): Promise<DeviceDTO> {
    try {
      const res: DeviceDTO = await this.devicesService.createDevice(deviceDto);
      return Promise.resolve(res);
    } catch (error) {
      this.logger.error("This error occurred in Device Controller. Method Name: createDevice", error);
      return Promise.reject(error);
    }
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Updating the device status',
    description: 'Updating ythe device status to dead or active state. If dead state removing the user Id',
  })
  @ApiBody({
    type: UpdateDeviceDTO
  })
  @ApiAcceptedResponse({
    type: Object
  })
  @Patch("/status")
  public async updateDeviceStatus(@Body() updateDeviceDTO: UpdateDeviceDTO): Promise<Record<string, string>> {
    try {
      let res = await this.devicesService.updateDeviceStatus(updateDeviceDTO);
      return Promise.resolve(res);
    } catch (error) {
      this.logger.error("This error occurred in Device Controller. Method Name: updateDeviceStatus", error);
      return Promise.reject(error);
    }
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Count the total number of device',
    description: 'Count the number of device by device type, device status andos type.',
  })
  @ApiQuery({
    enum: DeviceType,
    name: "deviceType",
    description: "Type of the device"
  })
  @ApiQuery({
    enum: OSType,
    name: "osType",
    description: "Type of the os in the device",
    required: false
  })
  @ApiQuery({
    enum: DeviceStatus,
    name: "deviceStatus",
    description: "Status of the device"
  })
  @Get("/count")
  public async countByStatusAndDeviceType(@Query("deviceStatus") deviceStatus: DeviceStatus, @Query("deviceType") deviceType: DeviceType, @Query("osType") osType: OSType): Promise<DeviceCount[] | number> {
    try {
      let res = await this.devicesService.findTotalCountByStatusAndDeviceType(deviceStatus, deviceType, osType);
      return Promise.resolve(res);
    } catch (error) {
      this.logger.error("This error occurred in Device Controller. Method Name: countByStatusAndDeviceType", error);
      return Promise.reject(error);
    }
  }

  // @ApiBearerAuth('JWT-auth')
  // @ApiOperation({
  //   summary: 'Assign device to the user',
  //   description: 'Updating the data useId and deviceIds and assaign a device to an user',
  // })
  // @ApiBody({
  //   type:String
  // })
  // @ApiBody({
  //   type :AssigndeviceDTO
  // })
  // @ApiAcceptedResponse({
  //   type: Object
  // })
  // @Patch('/assignDevice')
  // public async assingDevice(@Body("userId") userId:UUID, @Body("deviceIds") deviceIds:UUID[]){
  //   try{
  //      const ids = Array.isArray(deviceIds) ? deviceIds : [deviceIds];
  //     let res=await this.devicesService.assignDevice(userId,ids);
  //     return Promise.resolve(res);
  //   }catch(error){
  //     this.logger.error("This error occurred in Device Controller. Method Name: assingDevice", error);
  //     return Promise.reject(error);
  //   }
  // }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Get information of the active device and the person to whome it is assigned',
    description: 'Get information of the active device and the person to whome it is assigned',
  })
  @ApiQuery({
    type: Number,
    name: 'page',
    example: 1
  })
  @ApiQuery({
    type: Number,
    name: 'limit',
    description: 'Total data per page',
    example: 1
  })
  @ApiQuery({
    type: String,
    name: 'searchString',
    description: 'Search value like serial number, name and email',
    example: "6Q",
    required: false
  })
  @Get('/getInventory')
  public async getInventory(@Query("page") page: number, @Query("limit") limit: number, @Query("searchString") searchString: string): Promise<Record<string, Inventory[] | number>> {
    try {
      let res = await this.devicesService.getInventory(page, limit, searchString);
      return Promise.resolve(res);
    } catch (error) {
      this.logger.error("This error occurred in Device Controller. Method Name: getInventory", error);
      return Promise.reject(error);
    }
  }

  @Delete("/:deviceId")
  public async deleteDevice(@Param("deviceId") deviceId: UUID): Promise<object> {
    try {
      let res: string = await this.devicesService.deleteDeviceById(deviceId);
      return Promise.resolve({ message: res });
    } catch (error) {
      this.logger.error("This error occurred in Device Controller. Method Name: getInventory", error);
      return Promise.reject(error);
    }
  }

  @Put('/editDevice')
  public async editDevice(@Body() updatedDevice: DeviceDTO) {
    try {
      const res = await this.devicesService.updateDevice(updatedDevice);
      return Promise.resolve({ res: res, message: "Device Updated Successfully" });
    } catch (error) {
      this.logger.error("This error occurred in DeviceController. Method Name: editDevice", error);
      return Promise.reject(error);
    }
  }

  @Put('/addBitlocker')
  public async addBitLockerKey(@Body() info: BitLockerAndRecovaryKey): Promise<any> {
    try {
      const res = await this.devicesService.addBitlockerKey(info);
      return Promise.resolve({ data: info, message: res });
    } catch (error) {
      this.logger.error("This error occured in DeviceController. Method Name: addBitLockerKey", error);
      return Promise.reject(error);
    }
  }

}
