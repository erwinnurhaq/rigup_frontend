const initialState = {
    user: null,
    token: null,
    isLogin: false,
    error: null,
    userTransactions: [],
}

export default (state = initialState, action) => {
    console.log('>>> in user reducer')
    console.log('last state: ', state)
    console.log('action content: ', action)
    switch (action.type) {
        case 'USER_ERROR':
            console.log('error: ', action.payload)
            return {
                ...state,
                error: action.payload.response.data.error
            }
        case 'USER_LOGIN':
            console.log('login success')
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                isLogin: true,
                error: null
            }
        case 'USER_LOGOUT':
            console.log('logout success')
            return initialState
        case 'USER_TRANSACTIONS':
            console.log('fetch user transaction success');
            return {
                ...state,
                userTransactions: action.payload
            }
        default:
            return state
    }
}