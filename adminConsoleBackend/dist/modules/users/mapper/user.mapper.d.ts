import { CreateUserDTO, UpdateUserDTO } from "../dto/create-user.dto";
import { UserDTO } from "../dto/user.dto";
import { User } from "../entities/user.entity";
export declare class UserMapper {
    static mapToEntity(userDto: CreateUserDTO): User;
    static mapToDTO(userEntity: User): UserDTO;
    static mapToUpdateEntity(userDto: UpdateUserDTO): User;
}
