import { CreateUser, GetUser } from "../../types/device.types";
import { call, put } from "redux-saga/effects";
import { createAdminFail, createAdminSuccess, createUserFail, createUserSuccess, deleteUserFail, deleteUserSuccess, getLoggedInUserFail, getLoggedInUserSuccess, getSingleUserFail, getSingleUserSuccess, getUserFail, getUserSuccess, loginUserFail, loginUserSuccess, revokeAdminFail, revokeAdminSuccess, updateUserFail, updateUserSuccess } from "./user.actions";
import api from "../../Interceptors/api.interceptor";
import { UserRole } from "../../config/enum.config";

const createUser = async (payload: CreateUser): Promise<any> => {
    try {
        const res = await api.post("users/create", payload);
        return Promise.resolve(res);
    } catch (error) {
        return Promise.reject(error);
    }
}

export function* createUserGenerator(action: any): any {
    try {
        const resp: any = yield call(createUser, action.payload);
        yield put(createUserSuccess(resp.data));

    } catch (error:any) {
        yield put(createUserFail(error.response.data));
    }
}

const fetchUser = async (payload: GetUser): Promise<any> => {
    try {
        const res = await api.get(`users/employee/active?userType=${[UserRole.Admin, UserRole.Employee]}&page=${payload.page}&limit=${payload.limit}${payload.searchString?`&searchString=${payload.searchString}`:""}`);
        return Promise.resolve(res);
    } catch (error) {
        return Promise.reject(error);
    }
}

export function* fetchUserGenerator(action: any): any {
    try {
        const resp: any = yield call(fetchUser, action.payload);
        yield put(getUserSuccess(resp.data));
    } catch (error:any) {
        yield put(getUserFail(error.response.data));
    }
}

const deleteUser = async (payload: any): Promise<any> => {
    try {
        const res = await api.delete(`users/${payload}`);
        return Promise.resolve(res);
    } catch (error) {
        return Promise.reject(error);
    }
}

export function* deleteUserGenerator(action: any): any {
    try {
        const resp: any = yield call(deleteUser, action.payload);
        yield put(deleteUserSuccess(resp.data));

    } catch (error:any) {
        console.log(error)
        yield put(deleteUserFail(error.response.data));
    }
}

const fetchUserByEmail = async(payload:string):Promise<any> =>{
    try {
        const res = await api.get(`users/userInfo?email=${payload}`);
        return Promise.resolve(res);
    } catch (error) {
        return Promise.reject(error);
    }
}

export function* fetchUserByEmailGen(action:any):any{
    try {
        const resp = yield call(fetchUserByEmail, action.payload);
        yield put(getSingleUserSuccess(resp.data));
    } catch (error:any) {
        yield put(getSingleUserFail(error.response.data))
    }
}

const udpateUserInfo = async (payload:any):Promise<any> =>{
    try {
        const res = await api.put(`users/employee/edit`, payload);
        return Promise.resolve(res);
    } catch (error) {
        return Promise.reject(error);
    }
}

export function* updateUserInfoGen(action:any):any{
    try {
        const resp:any = yield call(udpateUserInfo, action.payload);
        yield put(updateUserSuccess(resp.data));
    } catch (error:any) {
        yield put(updateUserFail(error.response.data));
    }
}

export const loginUser = async (payload:any):Promise<any> =>{
    try {
        const resp:any = await api.post(`auth/login`, payload);
        return Promise.resolve(resp);
    } catch (error) {
        return Promise.reject(error);
    }
}

export function* loginUserGen(action:any):any{
    try {
        const res:any = yield call(loginUser, action.payload);
        yield put(loginUserSuccess(res.data));
    } catch (error:any) {
        yield put(loginUserFail(error?.response?.data));
    }
}

export const createAdmin = async(payload:any):Promise<any> =>{
    try {
        // console.log(payload);
        const resp:any = await api.patch(`users/changeTheRoleToAdmin`,payload);
        return Promise.resolve(resp);
    } catch (error) {
        return Promise.reject(error);
    }
}

export function* createAdminGen(action:any):any{
    try {
        const res:any = yield call(createAdmin, action.payload);
        yield put(createAdminSuccess(res.data));
    } catch (error:any) {
        yield put(createAdminFail(error.response?.data))
    }
}

export const revokeAdmin = async(payload:any):Promise<any> =>{
    try {
        const res:any = await api.patch(`users/admin/revoke`, payload);
        return Promise.resolve(res);
    } catch (error) {
        return Promise.reject(error);
    }
}

export function* revokeAdminGen(action:any):Generator<any>{
    try {
        const resp:any = yield call(revokeAdmin, action.payload);
        yield put(revokeAdminSuccess(resp.data));
    } catch (error:any) {
        yield put(revokeAdminFail(error.response.data));
    }
}

    export const getLoggedInUserInfo = async(payload:any):Promise<any> =>{
    try {
        const resp:any = await api.get(`users/userInfo?email=${payload.email}`);
        return Promise.resolve(resp);
    } catch (error) {
        return Promise.reject(error);
    }
}

export function* getLoggedInUserInfoGen(action:any):any{
    try {
        const res:any = yield call(getLoggedInUserInfo, action.payload);
        yield put(getLoggedInUserSuccess(res.data));
    } catch (error:any) {
        yield put(getLoggedInUserFail(error.response?.data))
    }
}