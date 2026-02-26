"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OSMapper = void 0;
const osInfo_dto_1 = require("../dtos/osInfo.dto");
const osInfo_entity_1 = require("../entities/osInfo.entity");
class OSMapper {
    static mapToEntity(osInfoDTO) {
        const osInfo = new osInfo_entity_1.OSInfo();
        osInfo.osName = osInfoDTO.osName;
        osInfo.osType = osInfoDTO.osType;
        osInfo.osVersion = osInfoDTO.osVersion;
        return osInfo;
    }
    static mapToDto(osInfoEntity) {
        const osInfoDto = new osInfo_dto_1.OSInfoDto();
        osInfoDto.osId = osInfoEntity.osId;
        osInfoDto.osName = osInfoEntity.osName;
        osInfoDto.osType = osInfoEntity.osType;
        osInfoDto.osVersion = osInfoEntity.osVersion;
        return osInfoDto;
    }
}
exports.OSMapper = OSMapper;
//# sourceMappingURL=osInfo.mapper.js.map