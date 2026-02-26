import api from "../../Interceptors/api.interceptor";
import { call, put } from "redux-saga/effects";
import { getOSFail, getOSSuccess } from "./os.actions";

const getAllOS = async () =>{
    try {
        const res = await api.get('osinfo');
        return Promise.resolve(res);
    } catch (error) {
        return Promise.reject(error);
    }
}

export function* getAllOSGen(action:any):any{
    try {
        const resp:any = yield call(getAllOS);
        yield put(getOSSuccess(resp.data));
    } catch (error:any) {
        yield put(getOSFail(error.response.data));
    }
}