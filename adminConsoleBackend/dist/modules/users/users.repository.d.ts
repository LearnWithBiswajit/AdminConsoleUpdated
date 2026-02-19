import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { IUserRepository } from "./interfaces/users.interface";
import { QueryAllEmployeesDTO } from "./dto/user.dto";
import { UUID } from "crypto";
import { UpdateUserDTO } from "./dto/create-user.dto";
import { UserRole } from "src/config/enum.config";
export declare class UserRepository implements IUserRepository {
    private readonly userRepo;
    constructor(userRepo: Repository<User>);
    logger: any;
    insertUser(userEntity: User): Promise<User>;
    getAllUsersByType(query: QueryAllEmployeesDTO): Promise<User[]>;
    deleteUserById(userId: UUID): Promise<number>;
    getUserByEmail(email: string): Promise<User | null>;
    getTotalCountByType(query: QueryAllEmployeesDTO): Promise<{
        TotalCount: number;
    }>;
    updateEmployee(body: User): Promise<User>;
    updateRole(body: UpdateUserDTO, role: UserRole): Promise<number>;
}
