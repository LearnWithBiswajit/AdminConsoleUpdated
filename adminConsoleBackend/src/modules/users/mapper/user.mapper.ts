import { CreateUserDTO, UpdateUserDTO } from "../dto/create-user.dto";
import { UserDTO } from "../dto/user.dto";
import { AppUser } from "../entities/appUser.entity";
import { User } from "../entities/user.entity";

export class UserMapper{
    public static mapToEntity(userDto:CreateUserDTO):User{
        const userEntity = new User();

        userEntity.employeeId = userDto.employeeId;
        userEntity.firstName = userDto.firstName;
        userEntity.middleName = userDto.middleName;
        userEntity.lastName = userDto.lastName;
        userEntity.email = userDto.email;
        userEntity.password = userDto.password;

        return userEntity;
    }

    public static mapToDTO(userEntity:User):UserDTO{
        const userDto = new UserDTO();

        userDto.userId = userEntity.userId;
        userDto.employeeId = userEntity.employeeId;
        userDto.firstName = userEntity.firstName;
        userDto.middleName = userEntity.middleName;
        userDto.lastName = userEntity.lastName;
        userDto.email = userEntity.email;
        userDto.role = userEntity.role;

        return userDto;
    }

    public static mapToUpdateEntity(userDto:UpdateUserDTO):User{
        const userEntity=new User()
        userDto.userId ? userEntity.userId = userDto.userId : undefined;
        userDto.employeeId ?userEntity.employeeId = userDto.employeeId:null;
        userDto.firstName ?userEntity.firstName = userDto.firstName:null;
        userDto.middleName ?userEntity.middleName = userDto.middleName:null;
        userDto.lastName ?userEntity.lastName = userDto.lastName:null;
        userDto.email ?userEntity.email = userDto.email:null;
        userDto.password ?userEntity.password = userDto.password:null;

        return userEntity;
    }

    public static mapToAppEntity(userDto:CreateUserDTO):AppUser{
        const userEntity = new AppUser();

        userEntity.userId = userDto.userId;
        userEntity.employeeId = userDto.employeeId;
        userEntity.firstName = userDto.firstName;
        userEntity.middleName = userDto.middleName;
        userEntity.lastName = userDto.lastName;
        userEntity.email = userDto.email;

        return userEntity;
    }

    public static mapToAppDTO(userEntity:AppUser):UserDTO{
        const userDto = new UserDTO();

        userDto.userId = userEntity.userId;
        userDto.employeeId = userEntity.employeeId;
        userDto.firstName = userEntity.firstName;
        userDto.middleName = userEntity.middleName;
        userDto.lastName = userEntity.lastName;
        userDto.email = userEntity.email;

        return userDto;
    }
}