import { IUserService } from './interfaces/users.interface';
import { QueryAllEmployeesDTO, UserDTO } from './dto/user.dto';
import { CreateUserDTO, UpdateUserDTO } from './dto/create-user.dto';
import { UUID } from 'crypto';
import { User } from 'src/modules/users/entities/user.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: IUserService);
    logger: any;
    registerUser(userDto: CreateUserDTO): Promise<UserDTO>;
    allEmployees(query: QueryAllEmployeesDTO): Promise<Record<string, UserDTO[] | number>>;
    updateEmployee(body: UpdateUserDTO): Promise<Record<string, string | UserDTO>>;
    deleteEmployee(userId: UUID): Promise<any>;
    fetchEmployeeById(email: string): Promise<UserDTO | null>;
    updateToAdmin(context: User, body: UpdateUserDTO): Promise<object>;
    revokeAdminPermission(context: User, body: UpdateUserDTO): Promise<object>;
    registerAppUser(body: CreateUserDTO): Promise<UserDTO>;
}
