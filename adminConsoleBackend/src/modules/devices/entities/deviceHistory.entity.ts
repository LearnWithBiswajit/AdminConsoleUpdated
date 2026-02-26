import { BrandName, DeviceStatus, DeviceType, OSType } from "src/config/enum.config";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"DevicesUsageHistory"})
export class DeviceUsageHistory {
    @PrimaryGeneratedColumn("uuid", {name:"Id"})
    id:string;
    @Column({name:"OSType", nullable:false, default:OSType.Linux })
    osType:OSType;
    @Column({name:"DeviceType", nullable:false, default:DeviceType.Others})
    deviceType:DeviceType;
    @Column({name:"Status", nullable:false, default:DeviceStatus.Active})
    deviceStatus:DeviceStatus;
    @Column({name:"UserID", nullable:true})
    userId:string;
    @Column({name:"MACAddress", nullable:false, unique:true, type:"json"})
    macAddress:string[];
    @Column({name:"HostName", nullable:false, unique:true})
    hostName:string;
    @Column({name:"SerialNumber", nullable:false, unique:true})
    serialNumber:string;
    @Column({name:"Brand", nullable:false})
    brand:BrandName;
}
