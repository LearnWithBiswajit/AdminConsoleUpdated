import { IsArray, IsUUID } from "@nestjs/class-validator";
// import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty, ApiPropertyOptional, PickType, OmitType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { UUID } from "crypto";
import { BrandName, DeviceStatus, DeviceType, OSType } from "src/config/enum.config";

export class DeviceDTO {

    //ApiProperty of the device id
    @ApiPropertyOptional({
        type:String,
        description: "Id of the device",
        // example: "fdf44da2-68ee-4419-a874-351f290fcccf",
        readOnly: true
    })
    @IsUUID()
    @IsOptional()
    id: UUID

    //API property of the ostype id
    @ApiProperty({
        enum:OSType,
        description: "Os Type of the device in number: Linux = 1, MAC = 2, Windows = 3, Android = 4, IOS = 5",
        example: 3
    })
    @IsEnum(OSType)
    @IsNotEmpty()
    @Type(() => Number)
    osType: OSType
    @ApiProperty({
        type:String,
        description:"Version of the OS",
        example:11
    })
    // @IsNotEmpty()
    // @IsString()
    // osId:string

    //Api property type of the deviceType
    @ApiProperty({
        enum:DeviceType,
        description: "Device Type of the device in number: Others = 1, Mobile = 2",
        example: 1
    })
    @IsEnum(DeviceType)
    @IsNotEmpty()
    @Type(() => Number)
    deviceType: DeviceType

    //Api property type of deviceStatus
    @ApiPropertyOptional({
        enum:DeviceStatus,
        description: "Device Status of the device in number: Active = 1, dead/unassigned = 2",
        example: 1
    })
    @IsEnum(DeviceStatus)
    @IsOptional()
    @Type(() => Number)
    deviceStatus: DeviceStatus

    @ApiPropertyOptional({
        type:String,
        description: "User Id of the device",
        example: "fdf44da2-68ee-4419-a874-351f290fcccf"
    })
    @IsString()
    // @IsNotEmpty()
    @IsOptional()
    userId: string;

    @ApiProperty({
        type:Array,
        description: "MAC address of the device",
        example: ["AU-90-BU-90-R8-A8"]
    })
    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty()
    macAddress: string[];

    @ApiProperty({
        type:String,
        description: "Host Name of the device",
        example: "HTI879RDB "
    })
    @IsString()
    @IsNotEmpty()
    hostName: string;

    @ApiProperty({
        type:String,
        description: "Serial Number of the device",
        example: "NIUF794WTH"
    })
    @IsString()
    @IsNotEmpty()
    serialNumber: string;

    @ApiProperty({
        enum:BrandName,
        description: "Brand Name of the device using number: HP = 1,Apple = 2, Dell = 3, Lenovo = 4",
        example: 1
    })
    @IsEnum(BrandName)
    @IsNotEmpty()
    brand: BrandName;

    @ApiProperty({
        type:String,
        description:"Version of the OS",
        example:"24.04"
    })
    @IsNotEmpty()
    @IsString()
    osVersion:string;
}

export class DeviceCount extends PickType(DeviceDTO, ["deviceType", "deviceStatus"]) {
    @ApiProperty({
        type:Number,
        description:"Total number of device with such os type, device type, and device status"
    })
    count: number;
}

export class QueryDevices extends OmitType(DeviceCount, ["count"]) {

    //Api property of the page
    @ApiProperty({
        type:Number,
        description: "Page Number To be shown",
        example: 1
    })
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    page: number;

    @ApiProperty({
        type:Number,
        description: "Limit in per page",
        example: 1
    })
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    limit: number;

    @ApiPropertyOptional({
        enum:OSType,
        description: "Os Type of the device in number: Linux = 1, MAC = 2, Windows = 3, Android = 4, IOS = 5",
        example: 3
    })
    @IsEnum(OSType)
    @IsOptional()
    @Type(() => Number)
    osType: OSType

    @ApiPropertyOptional({
        type:String,
        description: "Search string too serach devices using the serial number...",
        example: "NIUF794WTH"
    })
    @IsString()
    @IsOptional()
    searchString: string;

    @ApiPropertyOptional({
        type:Number,
        description: "Device Type of the device in number: Others = 1, Mobile = 2",
        example: 1
    })
    @IsEnum(DeviceType)
    @IsOptional()
    @Type(() => Number)
    deviceType: DeviceType
}

export class Inventory extends DeviceDTO {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
}

export class AssigndeviceDTO extends PickType(DeviceDTO, ["userId"]){
    @ApiProperty({
        type:Array,
        description: "Provide id for the device",
        example:["adc4885f-cc7c-45bc-bf7b-806afb164008"]
    })
    @IsArray()
    @IsUUID()
    @IsNotEmpty()
    deviceIds:UUID[]
}

export class BitLockerAndRecovaryKey extends PickType(DeviceDTO,["id"]){
    @IsNotEmpty()
    @IsString()
    bitlockerId:string;
    @IsNotEmpty()
    @IsString()
    recoveryKey:string;
}
export class DevicesInfo extends DeviceDTO{
    @IsNotEmpty()
    @IsString()
    bitlockerId:string;
    @IsNotEmpty()
    @IsString()
    recoveryKey:string;
}