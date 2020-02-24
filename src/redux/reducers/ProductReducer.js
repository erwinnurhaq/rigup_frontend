const initialState = {
    productList: null,
    uncategorizedProductList: null,
    productListByCat: null,
    productDetail: null,
    loading: true,
    error: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'PRODUCT_LOADING':
            return {
                ...state,
                loading: true
            }
        case 'PRODUCT_ERROR':
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case 'PRODUCTLIST_FETCH_SUCCESS':
            return {
                ...state,
                productList: action.payload,
                loading: false,
                error: null
            }
        case 'UNCATEGORIZEDPRODUCTLIST_FETCH_SUCCESS':
            return {
                ...state,
                uncategorizedProductList: action.payload,
                loading: false,
                error: null
            }
        case 'PRODUCTLISTBYCATEGORY_FETCH_SUCCESS':
            return {
                ...state,
                productListByCat: action.payload,
                loading: false,
                error: null
            }
        case 'PRODUCTDETAIL_FETCH_SUCCESS':
            return {
                ...state,
                productDetail: action.payload,
                loading: false,
                error: null
            }
        default:
            return state
    }
}