import { OSInfoDto } from "../dtos/osInfo.dto";
import { OSInfo } from "../entities/osInfo.entity";

export class OSMapper{
    public static mapToEntity(osInfoDTO:OSInfoDto):OSInfo{
        const osInfo = new OSInfo();
        osInfo.osName = osInfoDTO.osName;
        osInfo.osType = osInfoDTO.osType;
        osInfo.osVersion = osInfoDTO.osVersion;
        return osInfo;
    }

    public static mapToDto(osInfoEntity:OSInfo):OSInfoDto{
        const osInfoDto = new OSInfoDto();
        osInfoDto.osId = osInfoEntity.osId;
        osInfoDto.osName = osInfoEntity.osName;
        osInfoDto.osType = osInfoEntity.osType;
        osInfoDto.osVersion = osInfoEntity.osVersion;
        return osInfoDto;
    }
}