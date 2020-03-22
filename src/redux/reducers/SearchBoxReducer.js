import { SEARCH_TEXTBOX } from '../actions/Types'

export default (state = '', action) => {
    switch (action.type) {
        case SEARCH_TEXTBOX:
            return action.payload
        default:
            return state
    }
}