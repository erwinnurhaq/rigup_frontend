const initialState = {
    productCats: null,
    loading: true,
    error: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'PRODUCTCAT_LOADING':
            return {
                ...state,
                loading: true
            }
        case 'PRODUCTCAT_ERROR':
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case 'PRODUCTCAT_FETCH_SUCCESS':
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