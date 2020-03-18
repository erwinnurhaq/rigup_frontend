import {
    PRODUCT_LOADING,
    PRODUCT_ERROR,
    PRODUCTLIST_FETCH_SUCCESS,
    PRODUCTLISTCOUNT_FETCH_SUCCESS,
    UNCATEGORIZEDPRODUCTLIST_FETCH_SUCCESS,
    PRODUCTLISTBYCATEGORY_FETCH_SUCCESS,
    PRODUCTLISTBYCATEGORYCOUNT_FETCH_SUCCESS
} from '../actions/Types'

const initialState = {
    productList: null,
    productListCount: null,
    uncategorizedProductList: null,
    productListByCat: null,
    productListByCatCount: null,
    loading: true,
    error: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT_LOADING:
            return {
                ...state,
                loading: true
            }
        case PRODUCT_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case PRODUCTLIST_FETCH_SUCCESS:
            return {
                ...state,
                productList: action.payload,
                loading: false,
                error: null
            }
        case PRODUCTLISTCOUNT_FETCH_SUCCESS:
            return {
                ...state,
                productListCount: action.payload,
                productListByCat: null,
                productListByCatCount: null,
                loading: false,
                error: null
            }
        case UNCATEGORIZEDPRODUCTLIST_FETCH_SUCCESS:
            return {
                ...state,
                uncategorizedProductList: action.payload,
                loading: false,
                error: null
            }
        case PRODUCTLISTBYCATEGORY_FETCH_SUCCESS:
            return {
                ...state,
                productList: null,
                productListByCat: action.payload,
                loading: false,
                error: null
            }
        case PRODUCTLISTBYCATEGORYCOUNT_FETCH_SUCCESS:
            return {
                ...state,
                productListCount: null,
                productListByCatCount: action.payload,
                loading: false,
                error: null
            }
        default:
            return state
    }
}