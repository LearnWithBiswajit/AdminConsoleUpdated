import { Device } from "src/modules/devices/entities/device.entity";
import { DeviceUsageHistory } from "src/modules/devices/entities/deviceHistory.entity";
import { OSInfo } from "src/modules/osInfo/entities/osInfo.entity";
import { UsersAssets } from "src/modules/UserDevices/entities/user_devices.entity";
import { AppUser } from "src/modules/users/entities/appUser.entity";
import { User } from "src/modules/users/entities/user.entity";

export const dbEntities = [Device, User, DeviceUsageHistory, UsersAssets, OSInfo, AppUser]