import { OSType } from "src/config/enum.config";

export class OSInfoDto{
    osId?:string;
    osName:string;
    osType:OSType;
    osVersion:string;
}