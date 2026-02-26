import { UUID } from "crypto";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({name:"AppUsers"})
export class AppUser{
    @PrimaryColumn({name:"UserID", type:"uuid", length:36})
    userId:UUID;
    @Column({name:"EmployeeID", type:"varchar", length:255, nullable:false})
    employeeId:string;
    @Column({name:"FirstName", type:"varchar", length:255, nullable:false})
    firstName:string;
    @Column({name:"MiddleName", type:"varchar", length:255, nullable:true})
    middleName:string;
    @Column({name:"LastName", type:"varchar", length:255, nullable:true})
    lastName:string;
    @Column({name:"Email", type:"varchar", length:255, nullable:false})
    email:string;
    @Column({name:"CreateDate", type:"timestamp", default:()=>"CURRENT_TIMESTAMP", nullable:false})
    createDate:Date;
    @Column({name:"ModifyDate", type:"timestamp", default:()=> "CURRENT_TIMESTAMP", nullable:true })
    modifyDate:Date;
    @Column({name:"CreateBy", type:"char", length:36, nullable:true})
    createBy:UUID;
    @Column({name:"modifyBy", type:"varchar", length:36, nullable:true})
    modifyBy:UUID;
    @Column({name:"IsActive", type:"tinyint", default:()=>1, nullable:false})
    isActive:boolean;
}