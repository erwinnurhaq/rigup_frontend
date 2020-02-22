const initialState = {
    productList: null,
    selectedProduct: null,
    uncategorizedProductList: null,
    productCat: null,
    loading: true,
    error: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'PRODUCT_ERROR':
            console.log('error')
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case 'PRODUCTLIST_FETCH_SUCCESS':
            console.log('product fetch success')
            return {
                ...state,
                productList: action.payload,
                loading: false,
                error: null
            }
        case 'SELECTEDPRODUCT_FETCH_SUCCESS':
            console.log('selected product fetch success')
            return {
                ...state,
                selectedProduct: action.payload,
                loading: false,
                error: null
            }
        case 'UNCATEGORIZEDPRODUCTLIST_FETCH_SUCCESS':
            console.log('unassigned product fetch success')
            return {
                ...state,
                uncategorizedProductList: action.payload,
                loading: false,
                error: null
            }
        case 'PRODUCTCAT_FETCH_SUCCESS':
            console.log('product cat fetch success')
            return {
                ...state,
                productCat: action.payload,
                loading: false,
                error: null
            }
        case 'PRODUCT_LOADING':
            return {
                ...state,
                loading: true
            }
        default:
            return state
    }
}