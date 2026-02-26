export enum OSType {
    Linux = 1,
    MAC = 2,
    Windows = 3,
    Android = 4,
    IOS = 5
}

export enum DeviceType {
    Others = 1,
    Mobile = 2,
    All = ""
}

export enum DeviceStatus {
    Active = 1,
    Dead = 2
}

export enum BrandName {
    HP = 1,
    Apple = 2,
    Dell = 3,
    Lenovo = 4,
    Others = 5
}

export enum UserRole {
    Admin = 1,
    Employee = 2,
    SuperAdmin = 3
}

export enum ModalState {
    AddUser = 1,
    AddDevice = 2,
    AssignDevice = 3,
    OsDevice = 4,
    UpdateUser = 5,
    UpdateDevice=6,
    AddBitlocker=7
}