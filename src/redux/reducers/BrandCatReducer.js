import {
    BRANDCAT_LOADING,
    BRANDCAT_ERROR,
    BRANDCAT_FETCH_SUCCESS
} from '../actions/Types'

const initialState = {
    brandCats: null,
    loading: false,
    error: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case BRANDCAT_LOADING:
            return {
                ...state,
                loading: true
            }
        case BRANDCAT_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case BRANDCAT_FETCH_SUCCESS:
            return {
                brandCats: action.payload,
                loading: false,
                error: null
            }
        default:
            return state
    }
}