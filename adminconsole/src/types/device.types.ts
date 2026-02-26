import { GridRowId } from "@mui/x-data-grid";
import { DeviceStatus, DeviceType, OSType, UserRole } from "../config/enum.config"

export type CreateDevice = {
    osType: string,
    osVersion:string,
    deviceType: string,
    userId: string,
    macAddress: string[],
    hostName: string,
    serialNumber: string,
    brand: string
}

export type CreateUser = {
    userId?:string;
    firstName:string;
    middleName:string;
    lastName:string;
    employeeId:string;
    email:string;
    password:string;
}

export type GetUser = {
    userType:UserRole,
    searchString?:string,
    page:number,
    limit:number
} 

export type AssignDeviceType = {
    userId:string,
    deviceIds:GridRowId[]
}

export type GetDevices = {
    deviceStatus:DeviceStatus,
    deviceType?:DeviceType,
    osType?:OSType,
    searchString?:string,
    page:number,
    limit:number
}