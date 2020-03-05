const initialState = {
    selectedCat: 1,
    categories: null,
    mostParent: null,
    mostChild: null,
    child: null,
    loading: true,
    error: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'CATEGORY_LOADING':
            return {
                ...state,
                loading: true
            }
        case 'CATEGORY_ERROR':
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case 'CATEGORY_FETCH_SUCCESS':
            return {
                ...state,
                categories: action.payload,
                loading: false,
                error: null
            }
        case 'MOSTPARENT_FETCH_SUCCESS':
            return {
                ...state,
                mostParent: action.payload,
                loading: false,
                error: null
            }
        case 'MOSTCHILD_FETCH_SUCCESS':
            return {
                ...state,
                mostChild: action.payload,
                loading: false,
                error: null
            }
        case 'CHILD_FETCH_SUCCESS':
            return {
                ...state,
                child: action.payload,
                loading: false,
                error: null
            }
        case 'SELECT_CAT':
            return {
                ...state,
                selectedCat: action.payload,
                loading: false,
                error: null
            }
        default:
            return state
    }
}