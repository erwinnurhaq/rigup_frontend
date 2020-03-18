import {
    BRAND_LOADING,
    BRAND_ERROR,
    BRANDLIST_FETCH_SUCCESS,
    BRANDBYCATEGORY_FETCH_SUCCESS
} from '../actions/Types'

const initialState = {
    brandList: null,
    brandByCategory: null,
    loading: false,
    error: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case BRAND_LOADING:
            return {
                ...state,
                loading: true
            }
        case BRAND_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case BRANDLIST_FETCH_SUCCESS:
            return {
                ...state,
                brandList: action.payload,
                loading: false,
                error: null
            }
        case BRANDBYCATEGORY_FETCH_SUCCESS:
            return {
                ...state,
                brandByCategory: action.payload,
                loading: false,
                error: null
            }
        default:
            return state
    }
}