"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = exports.BrandName = exports.DeviceStatus = exports.DeviceType = exports.OSType = void 0;
var OSType;
(function (OSType) {
    OSType[OSType["Linux"] = 1] = "Linux";
    OSType[OSType["MAC"] = 2] = "MAC";
    OSType[OSType["Windows"] = 3] = "Windows";
    OSType[OSType["Android"] = 4] = "Android";
    OSType[OSType["IOS"] = 5] = "IOS";
})(OSType || (exports.OSType = OSType = {}));
var DeviceType;
(function (DeviceType) {
    DeviceType[DeviceType["Others"] = 1] = "Others";
    DeviceType[DeviceType["Mobile"] = 2] = "Mobile";
})(DeviceType || (exports.DeviceType = DeviceType = {}));
var DeviceStatus;
(function (DeviceStatus) {
    DeviceStatus[DeviceStatus["Active"] = 1] = "Active";
    DeviceStatus[DeviceStatus["Dead"] = 2] = "Dead";
})(DeviceStatus || (exports.DeviceStatus = DeviceStatus = {}));
var BrandName;
(function (BrandName) {
    BrandName[BrandName["HP"] = 1] = "HP";
    BrandName[BrandName["Apple"] = 2] = "Apple";
    BrandName[BrandName["Dell"] = 3] = "Dell";
    BrandName[BrandName["Lenovo"] = 4] = "Lenovo";
    BrandName[BrandName["Others"] = 5] = "Others";
})(BrandName || (exports.BrandName = BrandName = {}));
var UserRole;
(function (UserRole) {
    UserRole[UserRole["Admin"] = 1] = "Admin";
    UserRole[UserRole["Employee"] = 2] = "Employee";
    UserRole[UserRole["SuperAdmin"] = 3] = "SuperAdmin";
})(UserRole || (exports.UserRole = UserRole = {}));
//# sourceMappingURL=enum.config.js.map