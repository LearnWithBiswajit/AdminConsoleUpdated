import { ACTIVE_DEVICES_COUNT_FAIL, ACTIVE_DEVICES_COUNT_SUCCESS } from "./actions"

const initialState = {
    loading: false,
    statusCode:0,
    data:[]
}

const dashboardReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ACTIVE_DEVICES_COUNT_SUCCESS:
            return {
                ...state,
                loading:false,
                statusCode:action.payload.statusCode,
                data: action.payload.data
            }
        case ACTIVE_DEVICES_COUNT_FAIL:
            return {
                ...state,
                data: action.payload.data
            }
            default:
                return state
    }
}

export default dashboardReducer;