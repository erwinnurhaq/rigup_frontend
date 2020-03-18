import {
    USER_LOADING,
    USER_ERROR,
    USER_LOGIN,
    USER_LOGOUT,
    RESEND_VERIFICATION_SUCCESS,
    SEND_EMAIL_RESETPASS_SUCCESS,
    RESETPASS_SUCCESS
} from '../actions/Types'

const initialState = {
    user: null,
    error: null,
    loading: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                loading: true
            }
        case USER_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case USER_LOGIN:
            return {
                ...state,
                user: action.payload,
                error: null,
                loading: false
            }
        case USER_LOGOUT:
            return initialState
        case RESEND_VERIFICATION_SUCCESS:
            return { ...state, loading: false }
        case SEND_EMAIL_RESETPASS_SUCCESS:
            return { ...state, loading: false }
        case RESETPASS_SUCCESS:
            return { ...state, loading: false }
        default:
            return state
    }
}