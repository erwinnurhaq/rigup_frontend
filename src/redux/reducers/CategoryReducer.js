const initialState = {
    categories: null,
    mostParent: null,
    mostChild: null,
    loading: true,
    error: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'CATEGORY_ERROR':
            console.log('error')
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case 'CATEGORY_FETCH_SUCCESS':
            console.log('category fetch success')
            return {
                ...state,
                categories: action.payload,
                loading: false,
                error: null
            }
        case 'MOSTPARENT_FETCH_SUCCESS':
            console.log('most parent fetch success')
            return {
                ...state,
                mostParent: action.payload,
                loading: false,
                error: null
            }
        case 'MOSTCHILD_FETCH_SUCCESS':
            console.log('most child fetch success')
            return {
                ...state,
                mostChild: action.payload,
                loading: false,
                error: null
            }
        case 'CATEGORY_LOADING':
            return {
                ...state,
                loading: true
            }
        default:
            return state
    }
}