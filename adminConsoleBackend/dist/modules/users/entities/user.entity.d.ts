import { UUID } from "crypto";
import { UserRole } from "src/config/enum.config";
export declare class User {
    userId: UUID;
    employeeId: string;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    password: string;
    createDate: Date;
    modifyDate: Date;
    role: UserRole;
    createBy: string;
    modifyBy: string;
    isActive: boolean;
    isDeleted: boolean;
}
