import { GET_ALL_OS_FAIL, GET_ALL_OS_SUCCESS } from "./os.actions"

const initialState = {
    loading: false,
    statusCode: 0,
    data: []
}

export const osReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_ALL_OS_SUCCESS:
            return {
                ...state,
                loading: false,
                statusCode: action.payload.statusCode,
                osData: action.payload.data
            }
        case GET_ALL_OS_FAIL:
            return {
                ...state,
                loading: false,
                osError:action.payload
            }
        default:
            return state;
    }
}