import { CLEAR_STATE, CREATE_ADMIN_FAIL, CREATE_ADMIN_SUCCESS, CREATE_USER_FAIL, CREATE_USER_SUCCESS, DELETE_USER_FAIL, DELETE_USER_SUCCESS, GET_SINGLE_USER_FAIL, GET_SINGLE_USER_SUCCESS, GET_USER_FAIL, GET_USER_SUCCESS, LOGGEDIN_USER_INFO_FAIL, LOGGEDIN_USER_INFO_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER_SUCCESS, REVOKE_ADMIN_FAIL, REVOKE_ADMIN_SUCCESS, UPDATE_USER_FAIL, UPDATE_USER_SUCCESS } from "./user.actions"

const initialState = {
    loading: false,
    statusCode: 0,
    data: []
}

const userReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case CREATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                statusCode: action.payload.statusCode,
                data: action.payload.data
            }
        case CREATE_USER_FAIL:
            return {
                ...state,
                userError: action.payload
            }
        case GET_USER_SUCCESS:
            for (let i = 0; i < action.payload.data.employees.length; i++) {
                action.payload.data.employees[i]["id"] = action.payload.data.employees[i].userId;
            }
            return {
                ...state,
                loading: false,
                statusCode: action.payload.statusCode,
                usersData: action.payload.data
            }
        case GET_USER_FAIL:
            return {
                ...state,
                userError: action.payload
            }
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                statusCode: action.payload.statusCode,
                deleteUserData: action.payload.data
            }
        case DELETE_USER_FAIL:
            return {
                ...state,
                userError: action.payload
            }

        case GET_SINGLE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                statusCode: action.payload.statusCode,
                singleUserInfo: action.payload.data
            }
        case GET_SINGLE_USER_FAIL:
            return {
                ...state,
                userError: action.payload
            }

        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                statusCode: action.payload.statusCode,
                updatedUserInfo: action.payload
            }
        case UPDATE_USER_FAIL:
            return {
                ...state,
                userError: action.payload
            }
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                statusCode: action.payload.statusCode,
                loginUserInfo: action.payload
            }
        case LOGIN_USER_FAIL:
            console.log(action);
            return {
                ...state,
                status: action.payload.status,
                loginUserError: action.payload
            }

        case CREATE_ADMIN_SUCCESS:
            return {
                ...state,
                loading: false,
                statusCode: action.payload.statusCode,
                dataAdmin: action.payload
            }
        case CREATE_ADMIN_FAIL:
            return {
                ...state,
                status: action.payload.status,
                dataAdminError: action.payload
            }

        case REVOKE_ADMIN_SUCCESS:
            return {
                ...state,
                loading: false,
                statusCode: action.payload.statusCode,
                dataAdmin: action.payload
            }
        case REVOKE_ADMIN_FAIL:
            return {
                ...state,
                status: action.payload.status,
                dataAdminError: action.payload
            }

        case LOGGEDIN_USER_INFO_SUCCESS:
            return {
                ...state,
                loading: false,
                statusCode: action.payload.statusCode,
                loggedInUserInfo: action.payload
            }
        case LOGGEDIN_USER_INFO_FAIL:
            // console.log(action.payload);
            return {
                ...state,
                // status: action.payload.status,
                loggedInUserInfoError: action.payload
            }

        case CLEAR_STATE:
            return {
                ...state,
                loading: false,
                statusCode: 0,
                data: [],
                updatedUserInfo: [],
                singleUserInfo: [],
                dataAdmin:[]

            }
        default:
            return state
    }
}

export default userReducer;