import { UserRole } from "src/config/enum.config";
import { CreateUserDTO, UpdateUserDTO } from "../dto/create-user.dto";
import { QueryAllEmployeesDTO, UserDTO } from "../dto/user.dto";
import { User } from "../entities/user.entity";
import { UUID } from "crypto";
import { AppUser } from "../entities/appUser.entity";
export interface IUserRepository {
    insertUser(userEntity: User): Promise<User>;
    getAllUsersByType(query: QueryAllEmployeesDTO): Promise<User[]>;
    getTotalCountByType(query: QueryAllEmployeesDTO): Promise<{
        TotalCount: number;
    }>;
    deleteUserById(userId: UUID): Promise<number>;
    getUserByEmail(email: string): Promise<User | null>;
    updateEmployee(body: User): Promise<User>;
    updateRole(body: UpdateUserDTO, role: UserRole): Promise<number>;
    createAppUser(appUserEntity: AppUser): Promise<AppUser>;
}
export interface IUserService {
    registerUser(userInfo: CreateUserDTO): Promise<UserDTO>;
    findAllUsersByType(query: QueryAllEmployeesDTO): Promise<Record<string, UserDTO[] | number>>;
    deleteUserById(userId: UUID): Promise<Record<string, number>>;
    getUserByEmail(email: string): Promise<UserDTO | null>;
    updateEmployee(body: UpdateUserDTO): Promise<UserDTO>;
    updateToAdmin(body: UpdateUserDTO, userInfo: User): Promise<Record<string, string>>;
    revokeAdminPermission(body: UpdateUserDTO, userInfo: User): Promise<Record<string, string>>;
    registerAppUser(userInfo: CreateUserDTO): Promise<UserDTO>;
}
