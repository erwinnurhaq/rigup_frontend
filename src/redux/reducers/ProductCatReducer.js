import {
    PRODUCTCAT_LOADING,
    PRODUCTCAT_ERROR,
    PRODUCTCAT_FETCH_SUCCESS
} from '../actions/Types'

const initialState = {
    productCats: null,
    loading: false,
    error: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case PRODUCTCAT_LOADING:
            return {
                ...state,
                loading: true
            }
        case PRODUCTCAT_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case PRODUCTCAT_FETCH_SUCCESS:
            return {
                ...state,
                productCats: action.payload,
                loading: false,
                error: null
            }
        default:
            return state
    }
}