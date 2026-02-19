import { UUID } from "crypto";
import { UserRole } from "src/config/enum.config";
declare const UserDTO_base: any;
export declare class UserDTO extends UserDTO_base {
    userId: UUID;
    role: UserRole;
}
export declare class QueryAllEmployeesDTO {
    userType: UserRole[];
    limit: number;
    page: number;
    searchString: string;
}
export {};
