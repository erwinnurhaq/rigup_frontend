const initialState = {
    user: null,
    token: null,
    isLogin: false,
    error: null,
    userTransactions: [],
    loading: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'USER_LOADING':
            return {
                ...state,
                loading: true
            }
        case 'USER_ERROR':
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case 'USER_LOGIN':
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                isLogin: true,
                error: null,
                loading: false
            }
        case 'USER_LOGOUT':
            return initialState
        case 'USER_TRANSACTIONS':
            return {
                ...state,
                userTransactions: action.payload,
                loading: false
            }
        default:
            return state
    }
}