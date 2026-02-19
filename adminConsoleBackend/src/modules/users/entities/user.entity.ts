import { UUID } from "crypto";
import { UserRole } from "src/config/enum.config";
import { Device } from "src/modules/devices/entities/device.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Users" })
export class User {
    @PrimaryGeneratedColumn("uuid", { name: "UserID" })
    // @OneToMany(()=>Device,(devices)=>devices.userId)
    userId: UUID;
    @Column({ name: "EmployeeID" })
    employeeId: string;
    @Column({ name: "FirstName" })
    firstName: string;
    @Column({ name: "MiddleName" })
    middleName: string;
    @Column({ name: "LastName" })
    lastName: string;
    @Column({ name: "Email" })
    email: string;
    @Column({ name: "Password" })
    password: string;
    @Column({ name: "CreateDate" })
    createDate: Date
    @Column({ name: "ModifyDate" })
    modifyDate: Date;
    @Column({ name: "Role" })
    role: UserRole
    @Column({ name: "CreateBy" })
    createBy: string;
    @Column({ name: "ModifyBy" })
    modifyBy: string;
    @Column({ name: "IsActive" })
    isActive: boolean;
    @Column({ name: "IsDeleted" })
    isDeleted: boolean;
    // @OneToMany(() => Device, device => device.user)
    // devices: Device[];
}
