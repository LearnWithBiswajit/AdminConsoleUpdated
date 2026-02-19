"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
const user_dto_1 = require("../dto/user.dto");
const user_entity_1 = require("../entities/user.entity");
class UserMapper {
    static mapToEntity(userDto) {
        const userEntity = new user_entity_1.User();
        userEntity.employeeId = userDto.employeeId;
        userEntity.firstName = userDto.firstName;
        userEntity.middleName = userDto.middleName;
        userEntity.lastName = userDto.lastName;
        userEntity.email = userDto.email;
        userEntity.password = userDto.password;
        return userEntity;
    }
    static mapToDTO(userEntity) {
        const userDto = new user_dto_1.UserDTO();
        userDto.userId = userEntity.userId;
        userDto.employeeId = userEntity.employeeId;
        userDto.firstName = userEntity.firstName;
        userDto.middleName = userEntity.middleName;
        userDto.lastName = userEntity.lastName;
        userDto.email = userEntity.email;
        userDto.role = userEntity.role;
        return userDto;
    }
    static mapToUpdateEntity(userDto) {
        const userEntity = new user_entity_1.User();
        userDto.userId ? userEntity.userId = userDto.userId : undefined;
        userDto.employeeId ? userEntity.employeeId = userDto.employeeId : null;
        userDto.firstName ? userEntity.firstName = userDto.firstName : null;
        userDto.middleName ? userEntity.middleName = userDto.middleName : null;
        userDto.lastName ? userEntity.lastName = userDto.lastName : null;
        userDto.email ? userEntity.email = userDto.email : null;
        userDto.password ? userEntity.password = userDto.password : null;
        return userEntity;
    }
}
exports.UserMapper = UserMapper;
//# sourceMappingURL=user.mapper.js.map