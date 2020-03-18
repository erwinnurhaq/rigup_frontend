import {
    USER_CART_LOADING,
    USER_CART_FETCHED,
    USER_CART_ERROR,
    USER_CART_EMPTY
} from '../actions/Types'

const initialState = {
    cart: null,
    loading: false,
    error: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case USER_CART_LOADING:
            return { ...state, loading: true }
        case USER_CART_FETCHED:
            return { ...state, cart: action.payload, loading: false }
        case USER_CART_ERROR:
            return { ...state, error: action.payload, loading: false }
        case USER_CART_EMPTY:
            return initialState
        default:
            return state
    }
}