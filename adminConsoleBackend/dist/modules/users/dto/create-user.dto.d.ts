import { UUID } from "crypto";
export declare class CreateUserDTO {
    employeeId: string;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    password: string;
}
export declare class UpdateUserDTO {
    userId: UUID;
    employeeId: string;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    password: string;
}
