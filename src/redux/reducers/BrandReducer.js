const initialState = {
    brands: null,
    brandByCategory: null,
    brandCats: null,
    error: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'BRAND_ERROR':
            console.log('error')
            return {
                ...state,
                error: action.payload
            }
        case 'BRAND_FETCH_SUCCESS':
            console.log('brand fetch success')
            return {
                ...state,
                brands: action.payload,
                error: null
            }
        case 'BRANDBYCATEGORY_FETCH_SUCCESS':
            console.log('brand by category fetch success')
            return {
                ...state,
                brandByCategory: action.payload,
                error: null
            }
        case 'BRANDCAT_FETCH_SUCCESS':
            console.log('brandcats fetch success')
            return {
                ...state,
                brandCats: action.payload,
                error: null
            }
        default:
            return state
    }
}