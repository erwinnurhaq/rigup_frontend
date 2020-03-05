const initialState = {
    user: null,
    error: null,
    loading: false,
    userTransactions: []
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
                ...initialState,
                error: action.payload,
                loading: false
            }
        case 'USER_LOGIN':
            return {
                ...state,
                user: action.payload,
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