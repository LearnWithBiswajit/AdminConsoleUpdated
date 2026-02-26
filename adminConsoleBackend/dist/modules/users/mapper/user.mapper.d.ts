import { CreateUserDTO, UpdateUserDTO } from "../dto/create-user.dto";
import { UserDTO } from "../dto/user.dto";
import { AppUser } from "../entities/appUser.entity";
import { User } from "../entities/user.entity";
export declare class UserMapper {
    static mapToEntity(userDto: CreateUserDTO): User;
    static mapToDTO(userEntity: User): UserDTO;
    static mapToUpdateEntity(userDto: UpdateUserDTO): User;
    static mapToAppEntity(userDto: CreateUserDTO): AppUser;
    static mapToAppDTO(userEntity: AppUser): UserDTO;
}
