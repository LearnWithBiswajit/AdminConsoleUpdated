import { IsArray } from "@nestjs/class-validator";
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { UUID } from "crypto";
import { DeviceDTO } from "src/modules/devices/dto/device.dto";

export class UserToDevice{
    @IsUUID()
    @IsOptional()
    id:UUID;

    @IsUUID()
    @IsNotEmpty()
    userId:UUID;

    @IsArray()
    @IsString({each:true})
    @IsNotEmpty()
    deviceIds:UUID[];
}

export class User_Device extends UserToDevice{
    @IsUUID()
    @IsNotEmpty()
    deviceId: UUID;
}

export class Inventory extends DeviceDTO {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsUUID()
    assetId:string;

    @IsString()
    bitlockerId:string;
    
    @IsString()
    recoveryKey:string;
}