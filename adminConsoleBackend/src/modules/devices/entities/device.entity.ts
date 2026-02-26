import { BrandName, DeviceStatus, DeviceType, OSType } from "src/config/enum.config";
import { User } from "src/modules/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Devices" })
export class Device {
    @PrimaryGeneratedColumn("uuid", { name: "Id" })
    id: string;
    // @Column({ name: "OSType", nullable: false, default: OSType.Linux })
    // osType: OSType;
    @Column({name:"OSId", nullable:false})
    osId:string;
    @Column({ name: "DeviceType", nullable: false, default: DeviceType.Others })
    deviceType: DeviceType;
    @Column({ name: "Status", nullable: false, default: DeviceStatus.Dead })
    deviceStatus: DeviceStatus;
    // @Column({ name: "UserID", nullable: true })
    // @ManyToOne(() => User, (user) => user.userId)
    // userId: string;
    @Column({ name: "MACAddress", nullable: false, unique: true, type: "json" })
    macAddress: string[];
    @Column({ name: "HostName", nullable: false, unique: true })
    hostName: string;
    @Column({ name: "SerialNumber", nullable: false, unique: true })
    serialNumber: string;
    @Column({ name: "Brand", nullable: false })
    brand: BrandName;
    @Column({name:"IsDeleted", nullable:false, default:0})
    isDeleted:boolean;
    @Column({name:"BitlockerID"})
    bitlockerId:string;
    @Column({name:"RecoveryKey"})
    recoveryKey:string;

    // @ManyToOne(() => User, user => user.devices)
    // @JoinColumn({ name: "UserID" }) // This tells TypeORM which column is the FK
    // user: User;
}
