import { UUID } from "crypto";
export declare class AppUser {
    userId: UUID;
    employeeId: string;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    createDate: Date;
    modifyDate: Date;
    createBy: UUID;
    modifyBy: UUID;
    isActive: boolean;
}
