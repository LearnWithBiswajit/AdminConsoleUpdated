import { OSInfoDto } from "../dtos/osInfo.dto";
import { OSInfo } from "../entities/osInfo.entity";
export declare class OSMapper {
    static mapToEntity(osInfoDTO: OSInfoDto): OSInfo;
    static mapToDto(osInfoEntity: OSInfo): OSInfoDto;
}
