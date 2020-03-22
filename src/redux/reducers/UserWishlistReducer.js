import {
    USER_WISHLIST_LOADING,
    USER_WISHLIST_FETCHED,
    USER_WISHLIST_ERROR
} from '../actions/Types'

const initialState = {
    wishlist: null,
    loading: false,
    error: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case USER_WISHLIST_LOADING:
            return { ...state, loading: true }
        case USER_WISHLIST_FETCHED:
            return { ...state, wishlist: action.payload, loading: false }
        case USER_WISHLIST_ERROR:
            return { ...state, error: action.payload, loading: false }
        default:
            return state
    }
}