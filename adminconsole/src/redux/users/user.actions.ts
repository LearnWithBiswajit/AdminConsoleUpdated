import { CreateUser, GetUser } from "../../types/device.types";

export const CREATE_USER_REQUEST = "CREATE_USER_REQUEST";
export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";
export const CREATE_USER_FAIL = "CREATE_USER_FAIL";

export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAIL = "GET_USER_FAIL";

export const DELETE_USER_REQUEST = "DELETE_USER_REQUEST";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAIL = "DELETE_USER_FAIL";

export const GET_SINGLE_USER_REQUEST = "GET_SINGLE_USER_REQUEST";
export const GET_SINGLE_USER_SUCCESS = "GET_SINGLE_USER_SUCCESS";
export const GET_SINGLE_USER_FAIL = "GET_SINGLE_USER_FAIL";

export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAIL = "UPDATE_USER_FAIL";

export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAIL = "LOGIN_USER_FAIL";

export const CREATE_ADMIN_REQUEST = "CREATE_ADMIN_REQUEST";
export const CREATE_ADMIN_SUCCESS = "CREATE_ADMIN_SUCCESS";
export const CREATE_ADMIN_FAIL = "CREATE_ADMIN_FAIL";

export const LOGGEDIN_USER_INFO_REQUEST = "LOGGEDIN_USER_INFO_REQUEST";
export const LOGGEDIN_USER_INFO_SUCCESS = "LOGGEDIN_USER_INFO_SUCCESS";
export const LOGGEDIN_USER_INFO_FAIL = "LOGGEDIN_USER_INFO_FAIL";

export const REVOKE_ADMIN_REQUEST = "REVOKE_ADMIN_REQUEST";
export const REVOKE_ADMIN_SUCCESS = "REVOKE_ADMIN_SUCCESS";
export const REVOKE_ADMIN_FAIL = "REVOKE_ADMIN_FAIL";

export const CLEAR_STATE = "CLEAR_STATE";

export const createUserRequest = (payload:CreateUser) =>({
    type:CREATE_USER_REQUEST,
    payload: payload
});

export const createUserSuccess = (payload:CreateUser) =>({
    type:CREATE_USER_SUCCESS,
    payload: payload
});

export const createUserFail = (payload:any) =>({
    type:CREATE_USER_FAIL,
    payload: payload
});

export const getUserRequest = (payload:GetUser) =>({
    type:GET_USER_REQUEST,
    payload: payload
});

export const getUserSuccess = (payload:CreateUser[]) =>({
    type:GET_USER_SUCCESS,
    payload: payload
});

export const getUserFail = (payload:any) =>({
    type:GET_USER_FAIL,
    payload: payload
});

export const deleteUserRequest = (userId:any) =>({
    type:DELETE_USER_REQUEST,
    payload: userId
});

export const deleteUserSuccess = (payload:string) =>({
    type:DELETE_USER_SUCCESS,
    payload: payload
});

export const deleteUserFail = (payload:any) =>({
    type:DELETE_USER_FAIL,
    payload: payload
});

export const getSingleUserRequest = (email:string) => ({
    type:GET_SINGLE_USER_REQUEST,
    payload:email
})

export const getSingleUserSuccess = (payload:any) => ({
    type:GET_SINGLE_USER_SUCCESS,
    payload:payload
})

export const getSingleUserFail = (payload:any) => ({
    type:GET_SINGLE_USER_FAIL,
    payload:payload
})

export const updateUserRequest = (payload:any) => ({
    type:UPDATE_USER_REQUEST,
    payload:payload
})

export const updateUserSuccess = (payload:any) => ({
    type:UPDATE_USER_SUCCESS,
    payload:payload
})

export const updateUserFail = (payload:any) => ({
    type:UPDATE_USER_FAIL,
    payload:payload
})

export const loginUserRequest = (payload:any) => ({
    type:LOGIN_USER_REQUEST,
    payload:payload
})

export const loginUserSuccess = (payload:any) => ({
    type:LOGIN_USER_SUCCESS,
    payload:payload
})

export const loginUserFail = (payload:any) => ({
    type:LOGIN_USER_FAIL,
    payload:payload
})

export const createAdminRequest = (payload:any) => ({
    type:CREATE_ADMIN_REQUEST,
    payload:payload
});

export const createAdminSuccess = (payload:any) => ({
    type:CREATE_ADMIN_SUCCESS,
    payload:payload
});

export const createAdminFail = (payload:any) => ({
    type:CREATE_ADMIN_FAIL,
    payload:payload
});

export const revokeAdminRequest = (payload:any) => ({
    type:REVOKE_ADMIN_REQUEST,
    payload:payload
});

export const revokeAdminSuccess = (payload:any) => ({
    type:REVOKE_ADMIN_SUCCESS,
    payload:payload
});

export const revokeAdminFail = (payload:any) => ({
    type:REVOKE_ADMIN_FAIL,
    payload:payload
});

export const getLoggedInUserRequest = (payload:any) => ({
    type:LOGGEDIN_USER_INFO_REQUEST,
    payload:payload
});

export const getLoggedInUserSuccess = (payload:any) => ({
    type:LOGGEDIN_USER_INFO_SUCCESS,
    payload:payload
});

export const getLoggedInUserFail = (payload:any) => ({
    type:LOGGEDIN_USER_INFO_FAIL,
    payload:payload
});

export const clearState = () =>({
    type:CLEAR_STATE
});