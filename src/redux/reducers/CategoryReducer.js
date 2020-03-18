import {
    CATEGORY_LOADING,
    CATEGORY_ERROR,
    CATEGORY_FETCH_SUCCESS,
    MOSTPARENT_FETCH_SUCCESS,
    MOSTCHILD_FETCH_SUCCESS,
    CHILD_FETCH_SUCCESS,
    CHILDOFMAINPARENT_FETCH_SUCCESS,
    SELECT_CAT,
    SELECT_CHILD_CAT,
    SELECT_FILTER_CAT,
    CATEGORIES_SEARCH_FILTER
} from '../actions/Types'

const initialState = {
    selectedCat: 0,
    categories: null,
    mostParent: null,
    mostChild: null,
    child: null,
    childOfMainParent: null,
    selectedChildCat: 0,
    searchFilter: null,
    selectedFilter: 0,
    loading: true,
    error: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case CATEGORY_LOADING:
            return {
                ...state,
                loading: true
            }
        case CATEGORY_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case CATEGORY_FETCH_SUCCESS:
            return {
                ...state,
                categories: action.payload,
                loading: false,
                error: null
            }
        case MOSTPARENT_FETCH_SUCCESS:
            return {
                ...state,
                mostParent: action.payload,
                loading: false,
                error: null
            }
        case MOSTCHILD_FETCH_SUCCESS:
            return {
                ...state,
                mostChild: action.payload,
                loading: false,
                error: null
            }
        case CHILD_FETCH_SUCCESS:
            return {
                ...state,
                child: action.payload,
                loading: false,
                error: null
            }
        case CHILDOFMAINPARENT_FETCH_SUCCESS:
            return {
                ...state,
                childOfMainParent: action.payload,
                searchFilter: null,
                loading: false,
                error: null
            }
        case SELECT_CAT:
            return {
                ...state,
                selectedCat: action.payload,
                loading: false,
                error: null
            }
        case SELECT_CHILD_CAT:
            return {
                ...state,
                selectedChildCat: action.payload,
                searchFilter: null,
                selectedFilter: 0,
                loading: false,
                error: null
            }
        case SELECT_FILTER_CAT:
            return {
                ...state,
                selectedChildCat: 0,
                selectedFilter: action.payload,
                loading: false,
                error: null
            }
        case CATEGORIES_SEARCH_FILTER:
            return {
                ...state,
                searchFilter: action.payload,
                childOfMainParent: null
            }
        default:
            return state
    }
}