import {
    USER_BUILD_LOADING,
    USER_BUILD_FETCHED,
    USER_BUILD_ERROR,
    USER_BUILD_INITIAL
} from '../actions/Types'

const initialState = {
    build: [],
    loading: false,
    error: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case USER_BUILD_LOADING:
            return { ...state, loading: true }
        case USER_BUILD_FETCHED:
            return { ...state, build: action.payload, loading: false }
        case USER_BUILD_ERROR:
            return { ...state, error: action.payload, loading: false }
        case USER_BUILD_INITIAL:
            return initialState
        default:
            return state
    }
}