import { ACTIVE_DEVICES_FAIL, ACTIVE_DEVICES_SUCCESS, ASSIGN_DEVICE_SUCCESS, ASSIGNED_DEVICE_INFO_FAIL, ASSIGNED_DEVICE_INFO_SUCCESS, CREATE_BITLOCKER_FAIL, CREATE_BITLOCKER_SUCCESS, CREATE_DEVICES_FAIL, CREATE_DEVICES_SUCCESS, DELETE_DEVICE_FAIL, DELETE_DEVICE_SUCCESS, GET_BITLOCKER_FAIL, GET_BITLOCKER_SUCCESS, RELEASE_DEVICE_FAIL, RELEASE_DEVICE_SUCCESS, SET_DEVICE_Info, UPDATE_DEVICE_FAIL, UPDATE_DEVICE_SUCCESS } from "./actions"
import { CLEAR_STATE } from "./users/user.actions";


const initialState = {
    loading: false,
    statusCode: 0,
    data: [],
    cleared: false
}

const deviceReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case CREATE_DEVICES_SUCCESS:
            return {
                ...state,
                loading: false,
                statusCode: action.payload.statusCode,
                data: action.payload.data
            }
        case CREATE_DEVICES_FAIL:
            return {
                ...state,
                deviceError: action.payload
            }
        case ACTIVE_DEVICES_SUCCESS:
            return {
                ...state,
                loading: false,
                statusCode: action.payload.statusCode,
                deviceData: action.payload.data
            }
        // case ACTIVE_DEVICES_FAIL:
        //     return {
        //         ...state,
        //         deviceError: action.payload
        //     }
        case ASSIGN_DEVICE_SUCCESS:
            return {
                ...state,
                loading: false,
                statusCode: action.payload.statusCode,
                assignedDevicesCount: action.payload.data
            }
        case ACTIVE_DEVICES_FAIL:
            return {
                ...state,
                loading: false,
                deviceError: action.payload
            }
        case ASSIGNED_DEVICE_INFO_SUCCESS:
            return {
                ...state,
                loading: false,
                statusCode: action.payload.statusCode,
                assignedDevices: action.payload.data
            }
        case ASSIGNED_DEVICE_INFO_FAIL:
            return {
                ...state,
                loading: false,
                deviceError: action.payload
            }
        case RELEASE_DEVICE_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case RELEASE_DEVICE_FAIL:
            return {
                ...state,
                loading: false,
                deviceError: action.payload.data
            }
        case SET_DEVICE_Info:
            return {
                ...state,
                loading: false,
                deviceInfo: action.payload
            }

        case DELETE_DEVICE_SUCCESS:
            return {
                ...state,
                loading: false,
                deleteDeviceData: action.payload
            }
        case DELETE_DEVICE_FAIL:
            return {
                ...state,
                loading: false,
                deleteDeviceError: action.payload.data
            }
        case UPDATE_DEVICE_SUCCESS:
            return {
                ...state,
                loading: false,
                updateDeviceInfo: action.payload
            }
        case UPDATE_DEVICE_FAIL:
            return {
                ...state,
                loading: false,
                updateDeviceError: action.payload.data
            }
        case CREATE_BITLOCKER_SUCCESS:
            return {
                ...state,
                loading: false,
                bitLockerInfo: action.payload
            }
        case CREATE_BITLOCKER_FAIL:
            return {
                ...state,
                loading: false,
                bitLockerError: action.payload.data
            }

        case GET_BITLOCKER_SUCCESS:
            return {
                ...state,
                loading: false,
                bitlockerList: action.payload
            }
        case GET_BITLOCKER_FAIL:
            return {
                ...state,
                loading: false,
                bitlockerListError: action.payload.data
            }

        case CLEAR_STATE:
            return {
                ...state,
                loading: false,
                statusCode: 0,
                data: [],
                assignedDevicesCount: 0,
                deleteDeviceData: {},
                updateDeviceInfo: [],
                bitLockerInfo: [],
                cleared: true
            }
        default:
            return state
    }
}

export default deviceReducer;