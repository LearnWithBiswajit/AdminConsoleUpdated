import { IUserRepository, IUserService } from './interfaces/users.interface';
import { CreateUserDTO, UpdateUserDTO } from './dto/create-user.dto';
import { QueryAllEmployeesDTO, UserDTO } from './dto/user.dto';
import { User } from './entities/user.entity';
import { UUID } from 'crypto';
import { IDevicesService } from '../devices/interfaces/device.interface';
import { IUserDevicesService } from '../UserDevices/interface/userAssignedToDevices.interface';
export declare class UsersService implements IUserService {
    private readonly userRepository;
    private readonly deviceService;
    private readonly assetsServices;
    constructor(userRepository: IUserRepository, deviceService: IDevicesService, assetsServices: IUserDevicesService);
    logger: any;
    registerUser(userInfo: CreateUserDTO): Promise<UserDTO>;
    findAllUsersByType(query: QueryAllEmployeesDTO): Promise<Record<string, UserDTO[] | number>>;
    deleteUserById(userId: UUID): Promise<Record<string, number>>;
    getUserByEmail(email: string): Promise<UserDTO | null>;
    updateEmployee(body: UpdateUserDTO): Promise<UserDTO>;
    updateToAdmin(body: UpdateUserDTO, userInfo: User): Promise<Record<string, string>>;
    revokeAdminPermission(body: UpdateUserDTO, userInfo: User): Promise<Record<string, string>>;
    registerAppUser(userInfo: CreateUserDTO): Promise<UserDTO>;
}
