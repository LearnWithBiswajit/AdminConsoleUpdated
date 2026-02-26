import { AssignDeviceType, CreateDevice } from "../types/device.types";

export const ACTIVE_DEVICES_COUNT_SUCCESS = "ACTIVE_DEVICES_COUNT_SUCCESS";
export const ACTIVE_DEVICES_COUNT_FAIL = "ACTIVE_DEVICES_COUNT_FAIL";
export const ACTIVE_DEVICES_COUNT_REQUEST = "ACTIVE_DEVICES_COUNT_REQUEST";

export const CREATE_DEVICES_SUCCESS = "CREATE_DEVICES_SUCCESS";
export const CREATE_DEVICES_FAIL = "CREATE_DEVICES_FAIL";
export const CREATE_DEVICES_REQUEST = "CREATE_DEVICES_REQUEST";

export const ACTIVE_DEVICES_SUCCESS = "ACTIVE_DEVICES_SUCCESS";
export const ACTIVE_DEVICES_FAIL = "ACTIVE_DEVICES_FAIL";
export const ACTIVE_DEVICES_REQUEST = "ACTIVE_DEVICES_REQUEST";

export const ASSIGN_DEVICE_REQUEST = "ASSIGN_DEVICE_REQUEST";
export const ASSIGN_DEVICE_SUCCESS = "ASSIGN_DEVICE_SUCCESS";
export const ASSIGN_DEVICE_FAIL = "ASSIGN_DEVICE_FAIL";

export const ASSIGNED_DEVICE_INFO_REQUEST = "ASSIGNED_DEVICE_INFO_REQUEST";
export const ASSIGNED_DEVICE_INFO_SUCCESS = "ASSIGNED_DEVICE_INFO_SUCCESS";
export const ASSIGNED_DEVICE_INFO_FAIL = "ASSIGNED_DEVICE_INFO_FAIL";

export const RELEASE_DEVICE_REQUEST = "RELEASE_DEVICE_REQUEST";
export const RELEASE_DEVICE_SUCCESS = "RELEASE_DEVICE_SUCCESS";
export const RELEASE_DEVICE_FAIL = "RELEASE_DEVICE_FAIL";
export const SET_DEVICE_Info = "SET_DEVICE_Info";

export const DELETE_DEVICE_REQUEST = "DELETE_DEVICE_REQUEST";
export const DELETE_DEVICE_SUCCESS = "DELETE_DEVICE_SUCCESS";
export const DELETE_DEVICE_FAIL = "DELETE_DEVICE_FAIL";

export const UPDATE_DEVICE_REQUEST = "UPDATE_DEVICE_REQUEST";
export const UPDATE_DEVICE_SUCCESS = "UPDATE_DEVICE_SUCCESS";
export const UPDATE_DEVICE_FAIL = "UPDATE_DEVICE_FAIL";

export const CREATE_BITLOCKER_REQUEST = "CREATE_BITLOCKER_REQUEST";
export const CREATE_BITLOCKER_SUCCESS = "CREATE_BITLOCKER_SUCCESS";
export const CREATE_BITLOCKER_FAIL = "CREATE_BITLOCKER_FAIL";

export const GET_BITLOCKER_REQUEST = "GET_BITLOCKER_REQUEST";
export const GET_BITLOCKER_SUCCESS = "GET_BITLOCKER_SUCCESS";
export const GET_BITLOCKER_FAIL = "GET_BITLOCKER_FAIL";

export const DOWNLOAD_REQUEST = "DOWNLOAD_REQUEST";

export const CLEAR_STATE = "CLEAR_STATE";

export const activeDeviceCountRequest = (payload:any) =>({
    type:ACTIVE_DEVICES_COUNT_REQUEST,
    payload:payload
});

export const activeDeviceCountSuccess = (payload:any) =>({
    type:ACTIVE_DEVICES_COUNT_SUCCESS,
    payload:payload
});

export const activeDeviceCountFail = (payload:any) =>({
    type:ACTIVE_DEVICES_COUNT_FAIL,
    payload:payload
});

export const createDeviceRequest = (payload:CreateDevice) =>({
    type:CREATE_DEVICES_REQUEST,
    payload:payload
});

export const createDevicesSuccess = (payload:any) =>({
    type:CREATE_DEVICES_SUCCESS,
    payload:payload
});

export const createDevicesFail = (payload:any) =>({
    type:CREATE_DEVICES_FAIL,
    payload:payload
});

export const activeDeviceRequest = (payload:any) =>({
    type:ACTIVE_DEVICES_REQUEST,
    payload:payload
});

export const activeDevicesSuccess = (payload:any) =>({
    type:ACTIVE_DEVICES_SUCCESS,
    payload:payload
});

export const activeDevicesFail = (payload:any) =>({
    type:ACTIVE_DEVICES_FAIL,
    payload:payload
});

export const assignDeviceRequest = (payload:AssignDeviceType) =>({
    type:ASSIGN_DEVICE_REQUEST,
    payload:payload
});

export const assignDevicesSuccess = (payload:any) =>({
    type:ASSIGN_DEVICE_SUCCESS,
    payload:payload
});

export const assignDevicesFail = (payload:any) =>({
    type:ASSIGN_DEVICE_FAIL,
    payload:payload
});

export const assignedDeviceInfoRequest = (payload:any) =>({
    type:ASSIGNED_DEVICE_INFO_REQUEST,
    payload:payload
});

export const assignedDeviceInfoSuccess = (payload:any) =>({
    type:ASSIGNED_DEVICE_INFO_SUCCESS,
    payload:payload
});

export const assignedDeviceInfoFail = (payload:any) =>({
    type:ASSIGNED_DEVICE_INFO_FAIL,
    payload:payload
});

export const releaseDeviceRequest = (payload:any) =>({
    type:RELEASE_DEVICE_REQUEST,
    payload:payload
});

export const releaseDeviceSuccess = (payload:any) =>({
    type:RELEASE_DEVICE_SUCCESS,
    payload:payload
});

export const releaseDeviceFail = (payload:any) =>({
    type:RELEASE_DEVICE_FAIL,
    payload:payload
});

export const setDeviceInfoAction = (payload:any) => ({
    type:SET_DEVICE_Info,
    payload:payload
});

export const deleteDeviceRequest = (payload:any) =>({
    type:DELETE_DEVICE_REQUEST,
    payload:payload
});

export const deleteDeviceSuccess = (payload:any) =>({
    type:DELETE_DEVICE_SUCCESS,
    payload:payload
});

export const deleteDeviceFail = (payload:any) =>({
    type:DELETE_DEVICE_FAIL,
    payload:payload
});

export const updateDeviceRequest = (payload:any) =>({
    type:UPDATE_DEVICE_REQUEST,
    payload:payload
});

export const updateDeviceSuccess = (payload:any) =>({
    type:UPDATE_DEVICE_SUCCESS,
    payload:payload
});

export const updateDeviceFail = (payload:any) =>({
    type:UPDATE_DEVICE_FAIL,
    payload:payload
});

export const createBitlockerRequest = (payload:any) =>({
    type: CREATE_BITLOCKER_REQUEST,
    payload:payload
});

export const createBitlockerSuccess = (payload:any) =>({
    type:CREATE_BITLOCKER_SUCCESS,
    payload:payload
});

export const createBitlockerFail = (payload:any) =>({
    type:CREATE_BITLOCKER_FAIL,
    payload:payload
});

export const getBitlockerRequest = (payload:any) =>({
    type: GET_BITLOCKER_REQUEST,
    payload:payload
});

export const getBitlockerSuccess = (payload:any) =>({
    type:GET_BITLOCKER_SUCCESS,
    payload:payload
});

export const getBitlockerFail = (payload:any) =>({
    type:GET_BITLOCKER_FAIL,
    payload:payload
});

export const downlaodRequest = (payload:any) => ({
    type:DOWNLOAD_REQUEST,
    payload:payload
})


export const clearState = () =>({
    type:CLEAR_STATE
});