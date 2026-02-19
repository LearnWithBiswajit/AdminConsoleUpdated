import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "UsersAssets"})
export class UsersAssets{
    @PrimaryGeneratedColumn("uuid",{name: "Id"})
    assetId:string;
    @Column({name: "userId"})
    userId:string;
    @Column({ name: "deviceId"})
    deviceId:string;
}