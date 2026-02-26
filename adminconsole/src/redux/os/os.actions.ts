export const GET_ALL_OS_REQUEST = "GET_ALL_OS_REQUEST";
export const GET_ALL_OS_SUCCESS = "GET_ALL_OS_SUCCESS";
export const GET_ALL_OS_FAIL = "GET_ALL_OS_FAIL";

export const getOSRequest = () =>({
    type:GET_ALL_OS_REQUEST,
})

export const getOSSuccess = (payload:any) => ({
    type:GET_ALL_OS_SUCCESS,
    payload:payload
});

export const getOSFail = (payload:any) => ({
    type:GET_ALL_OS_FAIL,
    payload:payload
});