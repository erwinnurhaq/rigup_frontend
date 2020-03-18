import {
    USERLIST_LOADING,
    USERLIST_ERROR,
    USERLIST_FETCHED,
    USERCOUNT_FETCHED
} from '../actions/Types'

const initialState = {
    userLists: null,
    userCount: 0,
    loading: false,
    error: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case USERLIST_LOADING:
            return { ...state, loading: true }
        case USERLIST_ERROR:
            return { ...state, loading: false, error: action.payload }
        case USERLIST_FETCHED:
            return { ...state, userLists: action.payload, loading: false, error: '' }
        case USERCOUNT_FETCHED:
            return { ...state, userCount: action.payload, loading: false, error: '' }
        default:
            return state
    }
}
