import { CAROUSEL_CONTENT_FETCHED } from '../actions/Types'

const initialState = {
    carousel: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case CAROUSEL_CONTENT_FETCHED:
            return { carousel: action.payload }
        default:
            return state
    }
}