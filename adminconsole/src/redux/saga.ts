import { ACTIVE_DEVICES_COUNT_REQUEST, ACTIVE_DEVICES_REQUEST, activeDeviceCountFail, activeDeviceCountSuccess, activeDevicesFail, activeDevicesSuccess, ASSIGN_DEVICE_REQUEST, assignDevicesFail, assignDevicesSuccess, ASSIGNED_DEVICE_INFO_REQUEST, assignedDeviceInfoFail, assignedDeviceInfoSuccess, CREATE_DEVICES_REQUEST, createDevicesFail, createDevicesSuccess, DELETE_DEVICE_REQUEST, deleteDeviceFail, deleteDeviceSuccess, RELEASE_DEVICE_REQUEST, releaseDeviceFail, releaseDeviceSuccess, DOWNLOAD_REQUEST, updateDeviceSuccess, updateDeviceFail, UPDATE_DEVICE_REQUEST, CREATE_BITLOCKER_REQUEST, createBitlockerFail, createBitlockerSuccess, getBitlockerFail, getBitlockerSuccess, GET_BITLOCKER_REQUEST } from "./actions"
import { call, put, takeLatest } from 'redux-saga/effects';
import { AssignDeviceType, CreateDevice } from "../types/device.types";
import { CREATE_ADMIN_REQUEST, CREATE_USER_REQUEST, DELETE_USER_REQUEST, GET_SINGLE_USER_REQUEST, GET_USER_REQUEST, LOGGEDIN_USER_INFO_REQUEST, LOGIN_USER_REQUEST, REVOKE_ADMIN_REQUEST, UPDATE_USER_REQUEST } from "./users/user.actions";
import { createAdminGen, createUserGenerator, deleteUserGenerator, fetchUserByEmailGen, fetchUserGenerator, getLoggedInUserInfoGen, loginUserGen, revokeAdminGen, updateUserInfoGen } from "./users/user.saga";
import api from "../Interceptors/api.interceptor";
import { GET_ALL_OS_REQUEST } from "./os/os.actions";
import { getAllOSGen } from "./os/os.saga";


const getActiveDeviceCount = async (payload: any): Promise<any> => {
    try {
        const res = await api.get(`devices/count?${payload.deviceStatus ? `deviceStatus=${payload.deviceStatus}` : ""}&deviceType=${payload.deviceType}`);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

function* fetchActiveDeviceCount(action: any): any {
    try {
        const response: any = yield call(getActiveDeviceCount, action.payload);
        // console.log(response)
        yield put(activeDeviceCountSuccess(response.data));
    } catch (error: any) {
        yield put(activeDeviceCountFail(error?.response?.data))
    }
}

const createDevice = async (payload: CreateDevice): Promise<any> => {
    try {
        const res = await api.post("devices", payload);
        return Promise.resolve(res);
    } catch (error) {
        return Promise.reject(error);
    }
}

function* createNewDevice(action: any): any {
    try {
        const resp: any = yield call(createDevice, action.payload);
        yield put(createDevicesSuccess(resp.data));

    } catch (error: any) {
        yield put(createDevicesFail(error.response.data));
    }
}

const fetchActiveDevices = async (payload: any): Promise<any> => {
    try {
        const res = await api.get(`devices?${payload.deviceStatus ? `deviceStatus=${payload.deviceStatus}` : ""}${payload.deviceType ? `&deviceType=${payload.deviceType}` : ""}&page=${payload.page}&limit=${payload.limit}&searchString=${payload.searchString ? payload.searchString : ""}${payload.osType ? `&osType=${payload.osType}` : ""}`);
        return Promise.resolve(res);
    } catch (error) {
        return Promise.reject(error);
    }
}

function* fetchActiveDevicesGen(action: any): any {
    try {
        const resp: any = yield call(fetchActiveDevices, action.payload);
        yield put(activeDevicesSuccess(resp.data))
    } catch (error: any) {
        yield put(activeDevicesFail(error.response.data));
    }
}

const assignDevices = async (payload: AssignDeviceType): Promise<any> => {
    try {
        const resp: any = await api.post("UserDevice/assignDevice", payload);
        return Promise.resolve(resp);
    } catch (error) {
        return Promise.reject(error);
    }
}

function* assignDevicesGen(action: any): Generator<any> {
    try {
        const resp: any = yield call(assignDevices, action.payload);
        yield put(assignDevicesSuccess(resp.data));
    } catch (error: any) {
        yield put(assignDevicesFail(error.response.data));
    }
}

const assignedDeviceList = async (payload: any): Promise<any> => {
    try {
        const resp: any = await api.get(`UserDevice/inventory?page=${payload.page}&limit=${payload.limit}${payload.searchString ? `&searchString=${payload.searchString}` : ""}`);
        return Promise.resolve(resp);
    } catch (error) {
        return Promise.reject(error);
    }
}


function* assignedDeviceListGen(action: any): Generator<any> {
    try {
        const resp: any = yield call(assignedDeviceList, action.payload);
        yield put(assignedDeviceInfoSuccess(resp.data));
    } catch (error: any) {
        yield put(assignedDeviceInfoFail(error.response.data));
    }
}


const releaseDevice = async (payload: any): Promise<any> => {
    try {
        const resp: any = await api.patch(`userdevice/removeUser/${payload.assetId}`);
        return Promise.resolve(resp);
    } catch (error) {
        return Promise.reject(error);
    }
}

function* releaseDeviceGen(action: any): Generator<any> {
    try {
        const resp: any = yield call(releaseDevice, action.payload);
        yield put(releaseDeviceSuccess(resp.data));
    } catch (error: any) {
        yield put(releaseDeviceFail(error.response.data));
    }
}

const deleteDevice = async (payload: string): Promise<any> => {
    try {
        const res: any = await api.delete(`devices/${payload}`);
        return Promise.resolve(res);
    } catch (error) {
        return Promise.reject(error);
    }
}

function* deleteDeviceGen(action: any): Generator<any> {
    try {
        const resp = yield call(deleteDevice, action.payload);
        yield put(deleteDeviceSuccess(resp.data));
    } catch (error: any) {
        console.log(error);
        yield put(deleteDeviceFail(error.response.data))
    }
}

const downloadPdf = async (payload: any): Promise<any> => {
    window.open(`${process.env.REACT_APP_API_BASE_URL}pdf/pdf/${payload}`)
}

function* downloadPdfGen(action: any): Generator<any> {
    yield call(downloadPdf, action.payload);
    // console.log(resp);
}

const updateDevice = async (payload: any): Promise<any> => {
    try {
        const res: any = await api.put(`devices/editDevice`, payload);
        return Promise.resolve(res);
    } catch (error) {
        return Promise.reject(error);
    }
}

function* updateDeviceGen(action: any): Generator<any> {
    try {
        const resp: any = yield call(updateDevice, action.payload);
            yield put(updateDeviceSuccess(resp.data));
    } catch (error: any) {
        yield put(updateDeviceFail(error.response.data));
    }
}

const createBitLocker = async (payload:any) =>{
    try {
        const res:any = await api.put("devices/addBitlocker", payload);
        return Promise.resolve(res);
    } catch (error) {
        return Promise.reject(error);
    }
}

function* createBitLockerGen(action:any):Generator<any>{
    try {
        const resp:any = yield call(createBitLocker, action.payload);
        yield put(createBitlockerSuccess(resp.data));
    } catch (error:any) {
        yield put(createBitlockerFail(error.response.data));
    }
}

const getBitlockerInfo = async(payload:any) =>{
    try {
        const res:any = await api.get(`userdevice/bitlockerInfo?page=${payload.page}&limit=${payload.limit}${payload.searchString ? `&searchString=${payload.searchString}` : ""}`);
        return Promise.resolve(res); 
    } catch (error) {
        return Promise.reject(error);
    }
}

function* getBitlockerInfoGen(action:any):Generator<any>{
    try {
        const resp:any = yield call(getBitlockerInfo, action.payload);
        yield put(getBitlockerSuccess(resp.data));
    } catch (error:any) {
        yield put(getBitlockerFail(error.response.data));
    }
}

export default function* rootSaga() {
    yield takeLatest(ACTIVE_DEVICES_COUNT_REQUEST, fetchActiveDeviceCount);
    yield takeLatest(CREATE_DEVICES_REQUEST, createNewDevice);
    yield takeLatest(CREATE_USER_REQUEST, createUserGenerator);
    yield takeLatest(GET_USER_REQUEST, fetchUserGenerator);
    yield takeLatest(DELETE_USER_REQUEST, deleteUserGenerator);
    yield takeLatest(ACTIVE_DEVICES_REQUEST, fetchActiveDevicesGen);
    yield takeLatest(ASSIGN_DEVICE_REQUEST, assignDevicesGen);
    yield takeLatest(ASSIGNED_DEVICE_INFO_REQUEST, assignedDeviceListGen);
    yield takeLatest(RELEASE_DEVICE_REQUEST, releaseDeviceGen);
    yield takeLatest(GET_SINGLE_USER_REQUEST, fetchUserByEmailGen);
    yield takeLatest(UPDATE_USER_REQUEST, updateUserInfoGen);
    yield takeLatest(LOGIN_USER_REQUEST, loginUserGen);
    yield takeLatest(CREATE_ADMIN_REQUEST, createAdminGen);
    yield takeLatest(LOGGEDIN_USER_INFO_REQUEST, getLoggedInUserInfoGen);
    yield takeLatest(DELETE_DEVICE_REQUEST, deleteDeviceGen);
    yield takeLatest(DOWNLOAD_REQUEST, downloadPdfGen);
    yield takeLatest(UPDATE_DEVICE_REQUEST, updateDeviceGen);
    yield takeLatest(REVOKE_ADMIN_REQUEST, revokeAdminGen);
    yield takeLatest(CREATE_BITLOCKER_REQUEST, createBitLockerGen);
    yield takeLatest(GET_BITLOCKER_REQUEST, getBitlockerInfoGen);
    yield takeLatest(GET_ALL_OS_REQUEST, getAllOSGen);
}