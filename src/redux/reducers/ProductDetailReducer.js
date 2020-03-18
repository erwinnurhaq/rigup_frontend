import {
    PRODUCTDETAIL_FETCH_SUCCESS,
    INITIALPRODUCTDETAIL
} from '../actions/Types'

const initialState = {}

export default (state = initialState, action) => {
    switch (action.type) {
        case PRODUCTDETAIL_FETCH_SUCCESS:
            return action.payload
        case INITIALPRODUCTDETAIL:
            return initialState
        default:
            return state
    }
}