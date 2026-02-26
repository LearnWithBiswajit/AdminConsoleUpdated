// import { PickType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsUUID } from "class-validator";
import { UUID } from "crypto";
import { DeviceDTO } from "./device.dto";
import { ApiProperty, PickType } from "@nestjs/swagger";

export class UpdateDeviceDTO extends PickType(DeviceDTO, [ "deviceStatus"]){
    @ApiProperty({
        type: String,
        description: "Id of the device",
        example:"fdf44da2-68ee-4419-a874-351f290fcccf"
    })
    @IsNotEmpty()
    @IsUUID()
    id:UUID;
}