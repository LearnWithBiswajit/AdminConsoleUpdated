import { OSType } from "src/config/enum.config";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"OSInfo"})
export class OSInfo{
    @PrimaryGeneratedColumn('uuid', {name:"OSId"})
    osId:string;
    @Column({name:"OSType", nullable:false, default:OSType.Linux, type:"tinyint"})
    osType:OSType;
    @Column({name:"OSName", nullable:false, type:"varchar"})
    osName:string;
    @Column({name:"OSVersion", nullable:false, type:"varchar"})
    osVersion:string;
}