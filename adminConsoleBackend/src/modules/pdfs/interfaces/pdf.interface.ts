import { DeviceStatus, DeviceType, OSType } from "src/config/enum.config";
// import { DeviceCount, DeviceDTO, Inventory, QueryDevices } from "../dto/device.dto";
// import { UpdateDeviceDTO } from "../dto/updateDevice.dto";
// import { Device } from "../entities/device.entity";
import { UUID } from "crypto";
// import { DeviceUsageHistory } from "../entities/deviceHistory.entity";
import { User } from "src/modules/users/entities/user.entity";
import { Inventory } from "src/modules/devices/dto/device.dto";
import { Response } from "express";



export interface IPdfServices{
    streamPDF(res: Response, id:UUID):Promise<any>
}